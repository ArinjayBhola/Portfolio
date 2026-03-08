"use client";

import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full mb-4 gap-3",
        isAssistant ? "justify-start" : "justify-end flex-row-reverse"
      )}
    >
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border",
        isAssistant ? "bg-primary/10 border-primary/20 text-primary" : "bg-secondary border-border text-secondary-foreground"
      )}>
        {isAssistant ? <Bot size={16} /> : <User size={16} />}
      </div>
      
      <div className={cn(
        "max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm",
        isAssistant 
          ? "bg-background border border-border rounded-tl-none" 
          : "bg-primary text-primary-foreground rounded-tr-none"
      )}>
        <p className="whitespace-pre-wrap leading-relaxed">
          {message.content}
        </p>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
