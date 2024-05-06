import { Inter, Source_Serif_4 } from 'next/font/google';
import localFont from 'next/font/local';

import '@/app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-sourceSerif4',
  style: 'italic',
});

const nexa = localFont({
  src: [
    {
      path: '../fonts/nexa/Nexa-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/nexa/Nexa-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/nexa/Nexa-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/nexa/Nexa-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../fonts/nexa/Nexa-XBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-nexa',
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${nexa.variable} ${sourceSerif4.variable}`}>
      <body>{children}</body>
    </html>
  );
}
