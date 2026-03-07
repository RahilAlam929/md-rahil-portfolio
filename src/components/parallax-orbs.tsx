"use client";

import { useEffect, useRef } from "react";

export default function ParallaxOrbs() {
  const a = useRef<HTMLDivElement | null>(null);
  const b = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (a.current) a.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        if (b.current) b.current.style.transform = `translate3d(${-x}px, ${-y}px, 0)`;
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={a}
        aria-hidden
        className="pointer-events-none fixed -left-40 -top-40 z-0 h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-3xl"
      />
      <div
        ref={b}
        aria-hidden
        className="pointer-events-none fixed -right-40 -bottom-40 z-0 h-[460px] w-[460px] rounded-full bg-fuchsia-500/10 blur-3xl"
      />
    </>
  );
}