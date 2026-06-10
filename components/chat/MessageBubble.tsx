"use client";

import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Markdown from './Markdown';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isAssistant = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      className={cn(
        "flex w-full mb-4 gap-2.5",
        isAssistant ? "justify-start" : "justify-end flex-row-reverse"
      )}
    >
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border shadow-sm",
        isAssistant
          ? "bg-gradient-to-br from-primary/15 to-primary/5 border-primary/20 text-primary"
          : "bg-secondary border-border text-secondary-foreground"
      )}>
        {isAssistant ? <Bot size={16} /> : <User size={16} />}
      </div>

      <div className={cn(
        "max-w-[82%] px-4 py-2.5 rounded-2xl text-sm shadow-sm",
        isAssistant
          ? "bg-card/90 backdrop-blur-sm border border-border/70 rounded-tl-sm text-foreground"
          : "bg-gradient-to-br from-primary to-primary/85 text-primary-foreground rounded-tr-sm"
      )}>
        {isAssistant ? (
          <Markdown content={message.content} />
        ) : (
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
