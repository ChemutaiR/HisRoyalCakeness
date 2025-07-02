import { Work_Sans } from 'next/font/google';
import './globals.css';

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
});

export const metadata = {
  title: 'His Royal Cakeness - Premium Cakes & Pastries',
  description: 'Discover our exquisite collection of handcrafted cakes and pastries, made with the finest ingredients and royal attention to detail. Order delicious cakes online in Kenya.',
  keywords: 'cakes, pastries, bakery, Kenya, Nairobi, custom cakes, birthday cakes, wedding cakes',
  authors: [{ name: 'His Royal Cakeness' }],
  creator: 'His Royal Cakeness',
  publisher: 'His Royal Cakeness',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hisroyalcakeness.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'His Royal Cakeness - Premium Cakes & Pastries',
    description: 'Discover our exquisite collection of handcrafted cakes and pastries, made with the finest ingredients and royal attention to detail.',
    url: 'https://hisroyalcakeness.com',
    siteName: 'His Royal Cakeness',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'His Royal Cakeness Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'His Royal Cakeness - Premium Cakes & Pastries',
    description: 'Discover our exquisite collection of handcrafted cakes and pastries, made with the finest ingredients and royal attention to detail.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${workSans.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      </head>
      <body className="font-work-sans">
        {children}
      </body>
    </html>
  );
} 