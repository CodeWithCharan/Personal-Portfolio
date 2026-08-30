import Image from "next/image";
import Link from "next/link";

interface ExperienceCard {
  id: number;
  company: string;
  role: string;
  period: string;
  type: string;
  description?: string;
  icon: string;
}

const experienceCards: ExperienceCard[] = [
  {
    id: 1,
    company: "Zemoso Technologies",
    role: "Associate Software Engineer",
    period: "Apr 2026 – Present",
    type: "Full-time",
    icon: "/cards/card-1.png",
  },
  {
    id: 2,
    company: "Zemoso Technologies",
    role: "Dev Intern",
    period: "Jul 2025 – Apr 2026",
    type: "Internship",
    icon: "/cards/card-2.png",
  },
];

export default function Experience(): React.JSX.Element {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
          Work Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experienceCards.map((card) => (
            <div
              key={card.id}
              className="bg-gradient-to-r from-slate-950 via-purple-950/30 to-slate-950 backdrop-blur-sm rounded-xl p-6 border-t-3 border-purple-700/50 hover:shadow-2xl hover:shadow-purple-900/50 flex items-start gap-4"
            >
              {/* Company Icon */}
              <div className="shrink-0">
                <Image
                  src={card.icon}
                  alt={card.company}
                  width={64}
                  height={64}
                  className="object-contain rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-white mb-1">
                  {card.role}
                </h3>
                <p className="text-purple-300 font-medium text-sm mb-3">
                  {card.company}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/10">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {card.period}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-900/60 text-purple-300 border border-purple-700/50">
                    {card.type}
                  </span>
                </div>

                {/* Description — only shown if provided */}
                {card.description && (
                  <p className="text-white/70 text-sm mb-4">{card.description}</p>
                )}

                <Link
                  href="https://www.linkedin.com/in/codewithcharan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors inline-block"
                >
                  VIEW ON LINKEDIN →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
