import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://shivraj7.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shivraj Pawar Portfolio",
    template: "%s | Shivraj Pawar",
  },
  description:
    "Shivraj Pawar (Shivraj0077) — Official interactive macOS desktop portfolio of Shivraj Pawar. Full-Stack & AI Engineer, Smart India Hackathon (SIH) Winner, and Codeforces Specialist.",
  keywords: [
    "Shivraj Portfolio",
    "Shivraj macOS",
    "Shivraj Pawar",
    "Shivraj Pawar Portfolio",
    "Shivraj macOS Portfolio",
    "Shivraj0077",
    "Shivraj",
    "Shivraj Pawar Software Engineer",
    "macOS Portfolio",
    "Shivraj Pawar macOS",
    "Shivraj Pawar Developer",
    "Shivraj Pawar SIH Winner",
    "Shivraj Pawar Codeforces",
    "Mac Portfolio Shivraj",
    "Software Engineer Portfolio",
    "Interactive Desktop Portfolio",
    "Next.js macOS Portfolio",
  ],
  authors: [{ name: "Shivraj Pawar", url: SITE_URL }],
  creator: "Shivraj Pawar",
  publisher: "Shivraj Pawar",
  alternates: {
    canonical: "/",
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
  openGraph: {
    title: "Shivraj Pawar | macOS Desktop Portfolio",
    description:
      "Explore the interactive macOS desktop portfolio of Shivraj Pawar — Full-Stack Engineer, AI Specialist, Smart India Hackathon Winner, and Codeforces Specialist.",
    url: SITE_URL,
    siteName: "Shivraj Pawar macOS Portfolio",
    images: [
      {
        url: "/mac-portfolio.jpeg",
        width: 1200,
        height: 630,
        alt: "Shivraj Pawar macOS Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivraj Pawar | macOS Portfolio",
    description:
      "Interactive macOS desktop portfolio experience of Shivraj Pawar (Shivraj0077). Software & AI Engineer.",
    creator: "@shivraj_twt",
    images: ["/mac-portfolio.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }) {
  // JSON-LD Structured Data Schema for Google indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shivraj Pawar",
    alternateName: ["Shivraj0077", "Shivraj"],
    url: SITE_URL,
    image: `${SITE_URL}/about.svg`,
    jobTitle: "Software Engineer & AI Engineer",
    description:
      "Software Engineer specializing in distributed systems, backend performance, AI platforms, and full-stack development. Smart India Hackathon Winner and Codeforces Specialist.",
    sameAs: [
      "https://github.com/Shivraj0077",
      "https://www.linkedin.com/in/shivraj-pawar-4a632837b",
      "https://codeforces.com/profile/Shivraj0077",
      "https://twitter.com/shivraj_twt",
    ],
    knowsAbout: [
      "Software Engineering",
      "Distributed Systems",
      "Full Stack Development",
      "Artificial Intelligence",
      "Next.js",
      "React",
      "Node.js",
      "Competitive Programming",
      "System Design",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shivraj Pawar macOS Portfolio",
    alternateName: "Shivraj Portfolio",
    url: SITE_URL,
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
