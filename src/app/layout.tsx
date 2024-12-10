import { Footer } from './components/Footer';
import { Header } from './components/Header';
import type { Metadata } from 'next';
import StoreProvider from './StoreProvider';
import localFont from 'next/font/local';
import './globals.css';
import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const consolasBold = localFont({
  src: './fonts/Consolas-Bold.woff',
  variable: '--font-bold',
  weight: '100 900',
});

const consolasRegular = localFont({
  src: './fonts/Consolas.woff',
  variable: '--font-regular',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Rick and Morty Wiki',
  description: 'A Frontend Developer Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body
          className={`${consolasBold.variable} ${consolasRegular.variable} antialiased`}
        >
          <div className="wrapper">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </body>
      </StoreProvider>
    </html>
  );
}
