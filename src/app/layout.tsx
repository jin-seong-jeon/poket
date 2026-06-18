import type { Metadata } from "next";
import ClientLayout from '@/components/ClientLayout';
import "./globals.css";

export const metadata: Metadata = {
  title: "PokePrice LIVE",
  description: "실시간 포켓몬 카드 시세 조회 및 컬렉션 관리",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
