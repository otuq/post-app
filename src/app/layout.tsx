import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Header } from './components/layout/Header'
import { Toaster } from "sonner"
import { ThemeProvider } from '../components/providers/ThemeProvider'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Portfolio Posts App",
    template: "%s | Portfolio Posts App",
  },
  description:
    "Next.js App Router、Prisma、Auth.jsを使用した投稿管理アプリです。",

  openGraph: {
    title: "Portfolio Posts App",
    description:
      "Next.js App Router、Prisma、Auth.jsを使用した投稿管理アプリです。",
    type: "website",
    locale: "ja_JP",
    siteName: "Portfolio Posts App",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Posts App",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <Header />
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
