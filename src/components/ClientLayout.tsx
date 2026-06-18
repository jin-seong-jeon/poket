"use client";

import React from 'react';
import { ConfigProvider, Layout } from 'antd';
import Navigation from './Navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
