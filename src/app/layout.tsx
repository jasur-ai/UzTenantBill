import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/app-engine';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'UzTenantBill — 2026 Toshkent • Professional Tenant Utility Recovery',
  description: "O'zbekiston va Markaziy Osiyo uchun maxsus yaratilgan professional platforma. Tijorat mulki kommunallarini adolatli va tez undirish.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`} style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
