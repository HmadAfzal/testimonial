import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '../context/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import StoreProvider from '@/context/storeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'testimonial',
  description: 'Your Secret Message Awaits.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" >
      <AuthProvider>
        <StoreProvider>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
        </StoreProvider>
      </AuthProvider>
    </html>
  );
}

