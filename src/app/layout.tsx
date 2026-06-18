import type { Metadata } from "next";
import { ConfigProvider, Layout } from 'antd';
import Navigation from '@/components/Navigation';
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
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#ef4444',
              borderRadius: 8,
              fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            },
          }}
        >
          <Layout style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <Navigation />
            <Layout.Content>
              {children}
            </Layout.Content>
            <Layout.Footer style={{ textAlign: 'center', color: '#64748b' }}>
              PokePrice LIVE ©{new Date().getFullYear()} Created with Antigravity
            </Layout.Footer>
          </Layout>
        </ConfigProvider>
      </body>
    </html>
  );
}
