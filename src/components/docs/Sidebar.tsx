"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { componentGroups, W } from "./wideset";

export function Sidebar() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const ids = componentGroups.flatMap((g) => g.items.map((i) => i.slug));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost visible entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="text-sm"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <div className="mb-6">
        <p
          className="uppercase mb-3"
          style={{
            fontFamily: "var(--font-plex-mono), monospace",
            fontSize: "11px",
            color: W.gray500,
            letterSpacing: "0.05em",
          }}
        >
          Getting started
        </p>
        <ul className="flex flex-col gap-1">
          <li>
            <Link
              href="/components#intro"
              className="block py-1.5 px-2 rounded-md transition-colors"
              style={{
                color: W.gray600,
                background:
                  active === "intro" ? W.gray200 : "transparent",
              }}
            >
              Introduction
            </Link>
          </li>
        </ul>
      </div>

      {componentGroups.map((group) => (
        <div key={group.name} className="mb-6">
          <p
            className="uppercase mb-3"
            style={{
              fontFamily: "var(--font-plex-mono), monospace",
              fontSize: "11px",
              color: W.gray500,
              letterSpacing: "0.05em",
            }}
          >
            {group.name}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const isActive = active === item.slug;
              return (
                <li key={item.slug}>
                  <Link
                    href={`#${item.slug}`}
                    className="block py-1.5 px-2 rounded-md transition-colors"
                    style={{
                      color: isActive ? W.black : W.gray600,
                      background: isActive ? W.gray200 : "transparent",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
