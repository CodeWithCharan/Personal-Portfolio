"use client";

import Image from "next/image";
import { useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  contributions?: string[];
  image: string;
  link?: string;
}

const featuredProjects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Discovery Platform",
    description:
      "A GenAI-powered discovery platform that automates client discovery by engaging stakeholders in intelligent, context-aware conversations to surface business requirements and knowledge gaps. Using LLMs, it dynamically generates questions, analyzes responses, and produces structured discovery reports with actionable insights — reducing manual effort and accelerating project planning and solution design.",
    contributions: [
      "Designed and built the Human-in-the-Loop workflow for interview question management — backend APIs, schema changes, and an inline review/approve UI — letting reviewers edit and approve LLM-generated questions before live interviews.",
      "Built a Knowledge Base ingestion pipeline supporting multiple document formats, with LLM-driven overview generation that auto-produces workspace summaries and 5 contextual discovery questions from uploaded documents.",
      "Developed the Workspace Detail Page — a full-stack feature covering the interview lifecycle from workspace creation and document upload through candidate invite gating (blocked until questions are approved) to report viewing.",
    ],
    image: "/projects/AI_Powered_Discovery_Platform.png",
  },
  {
    id: 2,
    title: "Root Cause Analysis Platform",
    description:
      "RCA Accelerator is a GenAI-powered platform that automates root cause analysis for incidents using a multi-agent AI architecture. It builds a knowledge graph linking code commits, deployments, infrastructure telemetry, and incidents, then integrates with tools like GitHub, Jira, Prometheus, and Splunk (via MCP) to combine RAG with reasoning — automatically surfacing root causes, evidence, and confidence-scored RCA reports to speed up incident resolution.",
    contributions: [
      "Built a multi-agent LangGraph pipeline (Orchestrator, Planner, Workers, RCA agents) with retry logic, confidence-gated early stopping, and SSE streaming for real-time investigation.",
      "Designed a dual-agent RCA system where a primary and conservative analyst independently generate confidence-scored reports, arbitrated by an LLM judge that resolves disagreements and validates citations.",
      "Engineered a plan-driven MCP integration where the Planner emits structured tool calls, executed by specialized workers (Metrics, Logs, GitHub, Graph) against live observability endpoints to gather evidence.",
    ],
    image: "/projects/Root_Cause_Analysis_Platform.png",
  },
];

export default function Projects(): React.JSX.Element {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const toggleContributions = (id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {featuredProjects.map((project, index) => {
          const isEven = index % 2 === 1;
          const isExpanded = expandedIds.has(project.id);

          return (
            <div key={project.id} className="mb-20 last:mb-0">
              <div className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isEven ? "lg:grid-flow-dense" : ""}`}>
                {/* Text Content */}
                <div className={`${isEven ? "lg:col-start-2" : ""}`}>
                  <p className="text-purple-400 text-lg lg:text-xl mb-2 font-medium">
                    Featured Project
                  </p>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                    {project.title}
                  </h3>

                  {/* Description Card */}
                  <div className="relative z-10 mb-6">
                    <div className={`bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/10 shadow-lg ${isEven ? "lg:ml-[-20%]" : "lg:w-[calc(100%+20%)]"}`}>
                      <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                        {project.description}
                      </p>

                      {/* Contributions toggle — only shown if contributions exist */}
                      {project.contributions && project.contributions.length > 0 && (
                        <div className="mt-4">
                          <button
                            onClick={() => toggleContributions(project.id)}
                            className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-200 group"
                          >
                            <span>{isExpanded ? "Hide" : "My"} Contributions</span>
                            <svg
                              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {/* Animated bullet list */}
                          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                            <ul className="space-y-2.5 border-t border-white/10 pt-4">
                              {project.contributions.map((point, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-white/80 text-sm leading-relaxed">
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* GitHub link — only shown if provided */}
                  {project.link && (
                    <div className="flex gap-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-purple-400 transition-colors duration-200"
                        aria-label="View project on GitHub"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>

                {/* Image Content */}
                <div className={`${isEven ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 p-2 lg:p-3 shadow-2xl">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
