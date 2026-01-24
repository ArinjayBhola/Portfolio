import React from "react";
import { AuroraBackground } from "./ui/aurora-background";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AuroraBackground>
      <div className="min-h-screen w-full text-foreground overflow-x-hidden font-body selection:bg-primary/20 selection:text-primary relative z-10">
        <div className="noise-bg fixed inset-0 z-50 pointer-events-none opacity-[0.03]"></div>
        <main className="flex-1 w-full relative">{children}</main>
      </div>
    </AuroraBackground>
  );
};

export default Layout;
