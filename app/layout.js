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

export const metadata = {
  metadataBase: new URL('https://shivraj7.vercel.app'),
  title: "MacOS Portfolio",
  description: "A high-performance, macOS-inspired portfolio",
  openGraph: {
    title: "MacOS Portfolio",
    description: "A high-performance, macOS-inspired portfolio",
    url: "https://shivraj7.vercel.app",
    siteName: "Shivraj Portfolio",
    images: [
      {
        url: "/mac-portfolio.jpeg",
        width: 1200,
        height: 630,
        alt: "MacOS Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MacOS Portfolio",
    description: "A high-performance, macOS-inspired portfolio",
    images: ["/mac-portfolio.jpeg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
