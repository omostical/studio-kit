"use client";

import { useEffect, useState } from "react";
import { W } from "./wideset";

type Heading = { id: string; text: string; level: number };

export function TOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const collect = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("main h2[id], main h3[id]")
      );
      setHeadings(
        nodes.map((n) => ({
          id: n.id,
          text: n.textContent ?? "",
          level: Number(n.tagName[1]),
        }))
      );
    };
    collect();
    // Re-collect after a tick in case content mounts late
    const t = setTimeout(collect, 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav
      className="text-sm"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <p
        className="uppercase mb-4"
        style={{
          fontFamily: "var(--font-plex-mono), monospace",
          fontSize: "11px",
          color: W.gray500,
          letterSpacing: "0.05em",
        }}
      >
        On this page
      </p>
      <ul className="flex flex-col gap-2">
        {headings.map((h) => {
          const isActive = active === h.id;
          return (
            <li
              key={h.id}
              style={{ paddingLeft: h.level === 3 ? "12px" : "0" }}
            >
              <a
                href={`#${h.id}`}
                className="transition-colors"
                style={{
                  color: isActive ? W.black : W.gray500,
                  fontSize: h.level === 3 ? "12.5px" : "13px",
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
