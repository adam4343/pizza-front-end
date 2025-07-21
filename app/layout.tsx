import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/provider";
import { SpeedInsights } from "@vercel/speed-insights/next"

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  display: "swap",                
  variable: "--font-nunito",     
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pizza Website",
  description: "Cloning of dodo pizza",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.variable}>
        <main className="min-h-screen">
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
