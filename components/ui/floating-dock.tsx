"use client";

import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface DockItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  download?: boolean;
  external?: boolean;
  active?: boolean;
  highlight?: boolean;
}

type DockEntry = DockItem | "divider";

export function FloatingDock({
  items,
  className,
}: {
  items: DockEntry[];
  className?: string;
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-2 rounded-2xl border border-border bg-background px-4 pb-3 shadow-sm md:flex",
        className
      )}
    >
      {items.map((item, i) =>
        item === "divider" ? (
          <div key={`divider-${i}`} className="mx-1 h-9 w-px self-center bg-border/70" />
        ) : (
          <IconContainer key={item.title} mouseX={mouseX} {...item} />
        )
      )}
    </motion.div>
  );
}

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
  download,
  external,
  active,
  highlight,
}: DockItem & { mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeSync = useTransform(distance, [-140, 0, 140], [42, 68, 42]);
  const iconSync = useTransform(distance, [-140, 0, 140], [20, 32, 20]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 170, damping: 14 });
  const iconSize = useSpring(iconSync, { mass: 0.1, stiffness: 170, damping: 14 });

  const inner = (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-full border transition-colors duration-300",
        highlight
          ? "border-primary bg-primary/10 text-primary"
          : active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-transparent bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground shadow-md"
          >
            {title}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: iconSize, height: iconSize }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
      {active && (
        <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={title}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={title}>
      {inner}
    </button>
  );
}
