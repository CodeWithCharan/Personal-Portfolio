"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#home", label: "Home", sectionId: "home" },
  { href: "#experience", label: "Experience", sectionId: "experience" },
  { href: "#about", label: "About", sectionId: "about" },
  { href: "#projects", label: "Projects", sectionId: "projects" },
  { href: "#contact", label: "Contact", sectionId: "contact" },
];

export default function Header(): React.JSX.Element {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.sectionId);

    // IntersectionObserver: fires when a section crosses the middle of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = () => setMenuOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0E17]/80 backdrop-blur-sm border-b border-white/10">
      <nav className="px-6 py-4">
        <div className="container mx-auto max-w-6xl flex items-center justify-between h-full">
          {/* Brand — monospace dev-style gradient text */}
          <Link
            href="/"
            className="font-mono text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent hover:from-violet-300 hover:to-purple-300 transition-all tracking-wider select-none"
          >
            &lt;CWC /&gt;
          </Link>

          {/* Desktop nav — hidden on mobile */}
          <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href} className="m-0 p-0">
                <Link
                  href={link.href}
                  className={`relative text-base font-normal transition-colors duration-200 group ${
                    activeSection === link.sectionId
                      ? "text-purple-400"
                      : "text-white/80 hover:text-purple-400"
                  }`}
                >
                  {link.label}
                  {/* Animated underline — full width when active, grows on hover */}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-purple-400 transition-all duration-300 ${
                      activeSection === link.sectionId
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger button — visible on mobile only */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 group"
            aria-label="Toggle navigation menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-[#0B0E17]/95 backdrop-blur-sm border-t border-white/10`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4 list-none m-0 p-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block text-base font-normal py-1 transition-colors duration-200 ${
                  activeSection === link.sectionId
                    ? "text-purple-400"
                    : "text-white/80 hover:text-purple-400"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
