import type { Metadata } from 'next';
import './../globals.css';

export const metadata: Metadata = {
  title: 'Rick and Morty Wiki',
  description: 'A Frontend Developer Portfolio',
};

export default function LocationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
