"use client";

const HeroBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-border/20 via-background to-background pointer-events-none" />
    </div>
  );
};

export default HeroBackground;
