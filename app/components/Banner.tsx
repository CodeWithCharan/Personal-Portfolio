"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Banner(): React.JSX.Element {
  const texts = ["Hi There! 👋", "I'm Charan! 😁"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    // Use Array.from() to split by Unicode code points so emojis (surrogate pairs)
    // are treated as a single character and never sliced mid-codepoint.
    const chars = Array.from(currentText);
    const currentCharCount = Array.from(displayedText).length;

    if (!isDeleting) {
      // Typing effect
      if (currentCharCount < chars.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(chars.slice(0, currentCharCount + 1).join(""));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, wait before deleting
        const timeout = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(50); // Faster deletion
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting effect
      if (currentCharCount > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(chars.slice(0, currentCharCount - 1).join(""));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, move to next text
        setIsDeleting(false);
        setTypingSpeed(100); // Reset typing speed
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayedText, isDeleting, currentTextIndex, texts, typingSpeed]);
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-6"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center ">
          {/* Left side - Text content */}
          {/* Right side - Character image */}
          <div className="flex justify-center lg:justify-end relative w-full lg:w-auto pb-6 lg:pb-0">
            <div className="relative lg:top-10">
              <Image
                src="/assets/pfp-me.png"
                alt="Sri Charan Thoutam - Associate Software Engineer"
                width={300}
                height={300}
                className="max-w-xs lg:max-w-md lg:-translate-x-8 lg:-translate-y-5"
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </div>
          </div>
          <div className="flex-1 space-y-6 text-center lg:text-left">

            <div className="">
              <p className="text-2xl"> An AI Engineer who </p>
              <h1 className="text-5xl tracking-tight lg:text-7xl font-semibold text-white leading-tight">
                Turns ideas into
                <br />
                <span className="bg-gradient-to-r from-violet-600 via-violet-400 to-violet-600 bg-clip-text text-transparent">
                  things that work
                </span>
                ...
              </h1>
              <p className="text-md text-white/80">
                Because AI is cool, but useful AI is cooler.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3 pt-15 text-center lg:text-left">
          <p className="text-5xl text-white font-bold">
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>
          <p className="text-lg lg:text-xl text-white/90 tracking-wide flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span>Currently, I&apos;m an Associate Software Engineer at</span>
            <span className="text-blue-400 font-semibold">Zemoso Technologies</span>
          </p>
          <p className="text-lg text-white/80 max-w-2xl mt-15 mx-auto lg:mx-0">
            I like data. I like building things. And lately, I&apos;ve been especially interested in
            what happens when you combine the two with AI. I work with Python, Generative AI, LLMs,
            RAG, and machine learning to turn ideas into practical applications. Always curious,
            always experimenting, always building :)
          </p>

          {/* Resume CTA */}
          <div className="mt-8 flex justify-center lg:justify-start">
            <a
              href="/assets/Sri_Charan_Thoutam_Resume.pdf"
              download="Sri_Charan_Thoutam_Resume.pdf"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-purple-900/40 hover:shadow-purple-900/70 hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
