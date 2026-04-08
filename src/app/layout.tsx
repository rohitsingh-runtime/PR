import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rohit Kumar Singh — A Journey of Growth',
  description:
    'An immersive storytelling experience showcasing the professional journey of Rohit Kumar Singh — from college to project management leadership.',
  keywords: ['portfolio', 'storytelling', 'professional journey', 'project manager'],
  authors: [{ name: 'Rohit Kumar Singh' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
