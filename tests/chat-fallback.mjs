import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function evaluate(file, dependencies = {}, env = {}) {
  const { outputText, diagnostics } = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    reportDiagnostics: true,
  });
  assert.equal(diagnostics.filter(item => item.category === ts.DiagnosticCategory.Error).length, 0);
  const module = { exports: {} };
  vm.runInNewContext(outputText, { exports: module.exports, module, require: name => {
    assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
    return dependencies[name];
  }, process: { env }, console: { warn() {} } }, { filename: file });
  return module.exports;
}
const tools = evaluate('lib/tools.ts');
const answer = (content = 'Here are the projects.', calls = []) => ({ choices: [{ message: { content, tool_calls: calls } }] });
const navigation = { function: { name: 'navigate_to_section', arguments: JSON.stringify({ sectionId: 'projects' }) } };
function setup(results, key = 'test-key') {
  const requests = [];
  const options = [];
  class FakeGroq {
    constructor(config) {
      options.push(config);
      this.chat = { completions: { create: async request => {
        requests.push(request);
        const result = results[requests.length - 1];
        if (result instanceof Error) throw result;
        return result;
      } } };
    }
  }
  return { requests, options, chat: evaluate('lib/groq.ts', { 'groq-sdk': FakeGroq, './tools': tools }, { GROQ_API_KEY: key }).chatWithGroq };
}
const messages = [{ role: 'user', content: 'Show me the projects' }];
let client = setup([answer('Here are the projects.', [navigation])]);
let result = await client.chat(messages, { sections: [] });
assert.equal(client.requests.length, 1);
assert.equal(client.requests[0].model, 'openai/gpt-oss-120b');
assert.equal(client.requests[0].reasoning_effort, 'low');
assert.equal(client.options[0].maxRetries, 0);
assert.equal(client.options[0].timeout, 12000);
assert.equal(result.toolCalls[0].parameters.sectionId, 'projects');
console.log('PASS: primary model, response and navigation tools, bounded timeout, SDK retries disabled');
for (const status of [429, 500, 503, 404, 'timeout']) {
  const failure = Object.assign(new Error('simulated provider failure'), { status });
  client = setup([failure, answer('Fallback answer', [navigation])]);
  result = await client.chat(messages, {});
  assert.equal(client.requests.length, 2);
  assert.equal(client.requests[1].model, 'qwen/qwen3.8-27b');
  assert.equal(client.requests[1].reasoning_effort, 'none');
  assert.equal(result.text, 'Fallback answer');
  assert.equal(result.toolCalls[0].tool, 'navigate_to_section');
  console.log(`PASS: automatic fallback after ${status}`);
}
for (const invalid of [answer(''), answer('', [{ function: { name: 'navigate_to_section', arguments: '{invalid' } }])]) {
  client = setup([invalid, answer('Recovered')]);
  assert.equal((await client.chat(messages, {})).text, 'Recovered');
  assert.equal(client.requests.length, 2);
}
client = setup([new Error('SECRET PROVIDER PAYLOAD'), new Error('SECRET PROVIDER PAYLOAD')]);
await assert.rejects(client.chat(messages, {}), /Both chat models are unavailable/);
assert.equal(client.requests.length, 2);
client = setup([], '');
await assert.rejects(client.chat(messages, {}), /Add GROQ_API_KEY to .env/);
assert.equal(client.requests.length, 0);
client = setup([]);
await assert.rejects(client.chat([], {}), /non-empty message/);
assert.equal(client.requests.length, 0);
console.log('PASS: empty and malformed replies fail over; both failures are handled; missing key and empty messages make no requests');
