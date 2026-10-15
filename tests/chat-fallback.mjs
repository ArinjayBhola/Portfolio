import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

function evaluate(file, dependencies = {}, env = {}) {
  const { outputText, diagnostics } = ts.transpileModule(
    fs.readFileSync(file, "utf8"),
    {
      fileName: file,
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
        jsx: ts.JsxEmit.ReactJSX,
      },
      reportDiagnostics: true,
    },
  );
  assert.equal(
    diagnostics.filter((item) => item.category === ts.DiagnosticCategory.Error)
      .length,
    0,
  );
  const module = { exports: {} };
  vm.runInNewContext(
    outputText,
    {
      exports: module.exports,
      module,
      require: (name) => {
        assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
        return dependencies[name];
      },
      process: { env },
      console: { warn() {} },
    },
    { filename: file },
  );
  return module.exports;
}
const tools = evaluate("lib/tools.ts");
const data = evaluate(
  "lib/data.tsx",
  Object.fromEntries(
    [
      "react/jsx-runtime",
      "react-icons/fa",
      "react-icons/si",
      "react-icons/ri",
      "react-icons/tb",
    ].map((name) => [name, require(name)]),
  ),
);
const context = evaluate("lib/chat-context.ts", { "./data": data });
const answer = (content = "Here are the projects.", calls = []) => ({
  choices: [{ message: { content, tool_calls: calls } }],
});
const navigation = {
  id: "call_navigation",
  type: "function",
  function: {
    name: "navigate_to_section",
    arguments: JSON.stringify({ sectionId: "projects" }),
  },
};
function setup(results, key = "test-key") {
  const requests = [];
  const options = [];
  class FakeGroq {
    constructor(config) {
      options.push(config);
      this.chat = {
        completions: {
          create: async (request) => {
            requests.push(request);
            const result = results[requests.length - 1];
            if (result instanceof Error) throw result;
            return result;
          },
        },
      };
    }
  }
  return {
    requests,
    options,
    chat: evaluate(
      "lib/groq.ts",
      { "groq-sdk": FakeGroq, "./tools": tools, "./chat-context": context },
      { GROQ_API_KEY: key },
    ).chatWithGroq,
  };
}
const messages = [{ role: "user", content: "Show me the projects" }];
let client = setup([answer("Here are the projects.", [navigation])]);
let result = await client.chat(messages, { sections: [] });
assert.equal(client.requests.length, 1);
assert.equal(client.requests[0].model, "openai/gpt-oss-120b");
assert.equal(client.requests[0].reasoning_effort, "low");
assert.equal(client.options[0].maxRetries, 0);
assert.equal(client.options[0].timeout, 12000);
assert.equal(result.toolCalls[0].parameters.sectionId, "projects");
console.log(
  "PASS: primary model, response and navigation tools, bounded timeout, SDK retries disabled",
);
client = setup([
  answer(null, [navigation]),
  answer("Explore the projects below."),
]);
result = await client.chat(messages, {});
assert.match(result.text, /PDF-Chat/);
assert.equal(result.toolCalls[0].parameters.sectionId, "projects");
assert.equal(
  client.requests.length,
  1,
  "Common questions need no second model request",
);
for (const secondReply of [new Error("Text request failed"), answer("")]) {
  client = setup([answer(null, [navigation]), secondReply]);
  result = await client.chat(messages, {
    sections: [
      { id: "projects", text: "PDF-Chat and LMS are featured projects." },
    ],
  });
  assert.match(result.text, /PDF-Chat/);
  assert.equal(result.toolCalls[0].parameters.sectionId, "projects");
  assert.equal(client.requests.length, 1);
}
client = setup([answer(null, [navigation]), answer("")]);
result = await client.chat(messages, {});
assert.ok(result.text.trim());
assert.equal(result.toolCalls.length, 1);
console.log(
  "PASS: tool-only replies get visible text; failed or empty follow-ups preserve navigation and show section information",
);
const experienceNavigation = {
  ...navigation,
  function: {
    name: "navigate_to_section",
    arguments: JSON.stringify({ sectionId: "experience" }),
  },
};
const experienceQuestion = [
  { role: "user", content: "Tell me about his experience" },
];
for (const responses of [
  [answer(null, [experienceNavigation])],
  [
    Object.assign(new Error("rate limited"), { status: 429 }),
    Object.assign(new Error("rate limited"), { status: 429 }),
  ],
]) {
  client = setup(responses);
  result = await client.chat(experienceQuestion, {
    sections: [{ id: "experience", text: "" }],
    experiences: [],
  });
  for (const company of [
    "Drizzy",
    "Pan Earth",
    "Mittal Gupta",
    "Ginete",
    "Codehop",
  ])
    assert.ok(result.text.includes(company), `Missing ${company}`);
  assert.ok(
    result.toolCalls.some((call) => call.parameters.sectionId === "experience"),
  );
  assert.doesNotMatch(result.text, /couldn't generate/);
}
console.log(
  "PASS: all five companies are answered with empty DOM context, tool-only replies, and both models rate limited",
);
for (const status of [429, 500, 503, 404, "timeout"]) {
  const failure = Object.assign(new Error("simulated provider failure"), {
    status,
  });
  client = setup([failure, answer("Fallback answer", [navigation])]);
  result = await client.chat(messages, {});
  assert.equal(client.requests.length, 2);
  assert.equal(client.requests[1].model, "qwen/qwen3.8-27b");
  assert.equal(client.requests[1].reasoning_effort, "none");
  assert.equal(result.text, "Fallback answer");
  assert.equal(result.toolCalls[0].tool, "navigate_to_section");
  console.log(`PASS: automatic fallback after ${status}`);
}
for (const invalid of [
  answer(""),
  answer("", [
    { function: { name: "navigate_to_section", arguments: "{invalid" } },
  ]),
]) {
  client = setup([invalid, answer("Recovered")]);
  assert.equal((await client.chat(messages, {})).text, "Recovered");
  assert.equal(client.requests.length, 2);
}
client = setup([
  new Error("SECRET PROVIDER PAYLOAD"),
  new Error("SECRET PROVIDER PAYLOAD"),
]);
await assert.rejects(
  client.chat([{ role: "user", content: "An unknown question" }], {}),
  /Both chat models are unavailable/,
);
assert.equal(client.requests.length, 2);
client = setup([], "");
await assert.rejects(client.chat(messages, {}), /Add GROQ_API_KEY to .env/);
assert.equal(client.requests.length, 0);
client = setup([]);
await assert.rejects(client.chat([], {}), /non-empty message/);
assert.equal(client.requests.length, 0);
console.log(
  "PASS: empty and malformed replies fail over; both failures are handled; missing key and empty messages make no requests",
);
