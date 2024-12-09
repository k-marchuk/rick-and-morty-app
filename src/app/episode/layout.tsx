import type { Metadata } from 'next';
import './../globals.css';

export const metadata: Metadata = {
  title: 'Rick and Morty Wiki',
  description: 'A Frontend Developer Portfolio',
};

export default function EpisodesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
