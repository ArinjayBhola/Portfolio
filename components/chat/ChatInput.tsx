"use client";

import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 pt-3 pb-2 bg-background/60">
      <div className="relative flex items-center gap-2 bg-secondary/40 border border-border/70 rounded-2xl pl-4 pr-1.5 py-1.5 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          disabled={disabled}
          className="flex-1 bg-transparent text-sm focus:outline-none disabled:opacity-50 placeholder:text-muted-foreground/60"
        />
        <button
          type="submit"
          disabled={!input.trim() || disabled}
          className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-2 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:scale-100 shadow-sm"
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
