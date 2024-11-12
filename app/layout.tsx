import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "My Next.js Blog",
  description: "A Progressive Web App blog built with Next.js",
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: [
    { rel: "icon", url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    { rel: "icon", url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    { rel: "apple-touch-icon", url: "/icon-192x192.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          id="register-service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function registerServiceWorker() {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.register('/service-worker.js')
                    .then(function(registration) {
                      console.log('Service Worker registered with scope:', registration.scope);
                    })
                    .catch(function(error) {
                      console.error('Service Worker registration failed:', error);
                    });
                } else {
                  console.log('Service Workers are not supported in this browser.');
                }
              }

              registerServiceWorker();
            `,
          }}
        />
      </body>
    </html>
  );
}
