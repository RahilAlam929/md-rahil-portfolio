"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress = (window.scrollY / total) * 100;
      setWidth(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[999] h-[3px] w-full bg-transparent">
      <div
        style={{ width: `${width}%` }}
        className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 transition-all"
      />
    </div>
  );
}