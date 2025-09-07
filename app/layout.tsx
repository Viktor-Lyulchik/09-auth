import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Footer from '@/components/Footer/Footer';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import { API_URL } from '@/lib/helpers';

const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Note HUB',
  description:
    'Application for creating, viewing and editing notes. Created in GoIT',
  openGraph: {
    title: 'Note HUB',
    description:
      'Application for creating, viewing and editing notes. Created in GoIT',
    url: API_URL,
    siteName: 'Note HUB app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Note HUB app image',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>
              {children}
              {modal}
            </main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
