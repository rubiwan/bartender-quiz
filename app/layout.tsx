import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Si usas Tailwind y quieres luego referenciar como var(--font-sans)
// usa 'variable'. Si no, con className basta.
const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
        <body className={`${geist.className} antialiased`}>
        {children}
        <Analytics />
        </body>
        </html>
    )
}
