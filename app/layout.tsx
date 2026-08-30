import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sri Charan Thoutam - Associate Software Engineer",
  description:
    "I like data. I like building things. And lately, I've been especially interested in what happens when you combine the two with AI. I work with Python, Generative AI, LLMs, RAG, and machine learning to turn ideas into practical applications. Always curious, always experimenting, always building :)",
  keywords: [
    "Sri Charan Thoutam",
    "Associate Software Engineer",
    "Generative AI",
    "Python Developer",
    "LLMs",
    "RAG",
    "Machine Learning",
    "Zemoso Technologies",
    "Portfolio",
  ],
  authors: [{ name: "Sri Charan Thoutam" }],
  creator: "Sri Charan Thoutam",
  publisher: "Sri Charan Thoutam",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👨🏻‍💻</text></svg>",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Sri Charan Thoutam - Associate Software Engineer",
    description:
      "I like data. I like building things. And lately, I've been especially interested in what happens when you combine the two with AI.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${poppins.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
