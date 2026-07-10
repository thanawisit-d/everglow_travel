import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/public/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://everglowtravel.com';

export const metadata = {
  title: {
    default: 'Everglow Travel',
    template: '%s | Everglow Travel',
  },
  description: 'Everglow Travel บริษัทนำเที่ยวชั้นนำ บริการทัวร์ต่างประเทศและทัวร์ในประเทศ พร้อมประสบการณ์การเดินทางที่ประทับใจ',
  icons: { icon: '/favicon.svg' },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      th: '/th',
      en: '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    siteName: 'Everglow Travel',
    title: 'Everglow Travel',
    description: 'Everglow Travel บริษัทนำเที่ยวชั้นนำ บริการทัวร์ต่างประเทศและทัวร์ในประเทศ',
    url: siteUrl,
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Everglow Travel',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/og-image.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '5 ซอยบางแวก 2 แยก 7-7/1',
    addressLocality: 'บางแวก',
    addressRegion: 'กรุงเทพมหานคร',
    postalCode: '10160',
    addressCountry: 'TH',
  },
  telephone: '+66 64 964 1959',
  email: 'Everglow.travel@hotmail.com',
  sameAs: [
    'https://www.facebook.com/everglow.travel',
    'https://www.instagram.com/everglow.travel',
    'https://line.me/R/ti/p/@everglow',
    'https://www.tiktok.com/@everglow.travel',
  ],
  priceRange: '฿฿฿',
  description: 'Everglow Travel บริษัทนำเที่ยวชั้นนำ ให้บริการทัวร์ต่างประเทศและทัวร์ในประเทศ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
