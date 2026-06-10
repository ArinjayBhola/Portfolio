"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Bot, RotateCcw } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { extractPageContent } from '@/lib/domExtractor';
import { executeAction } from '@/utils/actionExecutor';
import { ToolCall } from '@/lib/tools';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME: Message = {
  role: 'assistant',
  content:
    "Hi! I'm Arinjay's portfolio assistant. I can help you explore his **projects**, walk you through his **experience**, or even fill out the **contact form**. What would you like to do?",
};

const QUICK_ACTIONS = [
  'Show me the projects',
  'What are his top skills?',
  'Tell me about his experience',
  'How can I contact Arinjay?',
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const pageContext = extractPageContent();

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          pageContext,
        }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      if (data.text) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      }

      if (data.toolCalls && data.toolCalls.length > 0) {
        data.toolCalls.forEach((call: ToolCall) => {
          if (call.tool !== 'extract_page_content') {
            executeAction(call);
          }
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again in a moment." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([WELCOME]);
    setIsLoading(false);
  };

  const showQuickActions = messages.length === 1 && !isLoading;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="mb-4 w-[calc(100vw-3rem)] sm:w-[400px] h-[560px] max-h-[75vh] bg-background/80 backdrop-blur-xl border border-border/70 shadow-2xl shadow-black/10 rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative p-4 bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground flex items-center justify-between overflow-hidden">
              <div className="absolute -top-8 -right-6 w-28 h-28 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm ring-1 ring-white/20">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight font-heading">Portfolio Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                    <span className="text-[10px] opacity-90 uppercase tracking-[0.15em] font-semibold">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 relative z-10">
                <button
                  onClick={resetChat}
                  title="Reset conversation"
                  className="p-2 hover:bg-white/15 rounded-full transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-2 hover:bg-white/15 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 scroll-smooth custom-scrollbar"
            >
              {messages.map((msg, idx) => (
                <MessageBubble key={idx} message={msg} />
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 mb-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-primary/20 bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
                    <Bot size={16} />
                  </div>
                  <div className="bg-card/90 border border-border/70 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" />
                  </div>
                </motion.div>
              )}

              {/* Quick action suggestions */}
              {showQuickActions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-wrap gap-2 mt-1 pl-10"
                >
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action}
                      onClick={() => handleSendMessage(action)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border/70 bg-secondary/40 hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-200 font-medium"
                    >
                      {action}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Input */}
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center hover:shadow-primary/50 transition-shadow"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-2xl bg-primary/40 animate-ping opacity-30" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="relative z-10"
          >
            {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatWidget;
