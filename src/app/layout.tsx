import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MD Rahil | Full Stack Web Developer & Robotics Enthusiast",
  description:
    "Portfolio of MD Rahil - Full Stack Web Developer & Robotics Enthusiast. I build intelligent digital systems by combining modern web technologies with robotics and AI.",
  metadataBase: new URL("https://md-rahil-portfolio.example.com"),
  openGraph: {
    title: "MD Rahil | Full Stack Web Developer & Robotics Enthusiast",
    description:
      "Explore premium projects blending full stack development, robotics, and AI to create impactful real-world solutions.",
    type: "website",
    url: "https://md-rahil-portfolio.example.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD Rahil | Full Stack Web Developer & Robotics Enthusiast",
    description:
      "Intelligent digital systems built with modern full stack tools, robotics, and AI.",
  },
  keywords: [
    "MD Rahil",
    "Full Stack Developer",
    "Next.js Portfolio",
    "Robotics Enthusiast",
    "AI Builder",
    "React",
    "Node.js",
    "MongoDB",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-transparent text-slate-100`}
      >
        <div className="grid-bg" />
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
