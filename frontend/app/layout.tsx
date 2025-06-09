// ============================================================================
// FILE: app/layout.tsx
// Description: Root layout for the Next.js application.
// Handles global styles, font, and wraps the application with AppContext.
// ============================================================================
// This is a Server Component by default.
import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css'; // Global Tailwind CSS

// Import the AppContext provider (which will be a client component)
import { AppContextProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Brighten - AI-Powered Education for Dyslexia',
  description: 'An AI-powered educational platform tailored for African students with dyslexia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* AppContextProvider wraps the entire application to provide global state */}
        <AppContextProvider>
          {/* Navbar and Footer are placed here to be consistent across all pages */}
          <Navbar />
          <main className="flex-grow">
            {children} {/* This is where individual page content will be rendered */}
          </main>
          <Footer />
        </AppContextProvider>
      </body>
    </html>
  );
}
