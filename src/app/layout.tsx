import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HabitForge - Daily Habit Tracker and Streak Manager",
  description:
    "Track your daily habits, maintain streaks, and build a better you. A modern habit tracker with categories, weekly progress, and detailed stats.",
  openGraph: {
    title: "HabitForge - Daily Habit Tracker and Streak Manager",
    description:
      "Track your daily habits, maintain streaks, and build a better you. A modern habit tracker with categories, weekly progress, and detailed stats.",
    images: ["/og-image.png"],
    url: "https://habit-tracker-five-blush.vercel.app",
  },
  alternates: {
    canonical: "https://habit-tracker-five-blush.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "HabitForge",
              description:
                "Track your daily habits, maintain streaks, and build a better you. A modern habit tracker with categories, weekly progress, and detailed stats.",
              url: "https://habit-tracker-five-blush.vercel.app",
              applicationCategory: "LifestyleApplication",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
