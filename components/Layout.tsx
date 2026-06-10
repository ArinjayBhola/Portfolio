import ChatWidget from "./chat/ChatWidget";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-background">
      <div className="min-h-screen w-full text-foreground overflow-x-hidden font-body selection:bg-primary/20 selection:text-primary relative z-10">
        <main className="flex-1 w-full relative">{children}</main>
        <ChatWidget />
      </div>
    </div>
  );
};

export default Layout;
