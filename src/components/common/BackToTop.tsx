"use client";

import React from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > 100;
      setIsVisible(shouldShow);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={handleClick}
      className={
        "fixed bottom-6 right-6 z-[9999] h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-opacity duration-200 flex items-center justify-center " +
        (isVisible ? "opacity-100" : "opacity-0 pointer-events-none")
      }
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
