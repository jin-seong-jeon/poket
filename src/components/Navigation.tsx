"use client";

import React from 'react';
import { Layout, Menu, Input } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Header } = Layout;

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { key: '/', label: <Link href="/">대시보드</Link> },
    { key: '/collection', label: <Link href="/collection">마이 컬렉션</Link> },
  ];

  const handleSearch = (value: string) => {
    if (value) {
      // In a real app, this would route to a search results page
      console.log('Searching for:', value);
    }
  };

  return (
    <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderBottom: '1px solid #f0f0f0', padding: '0 50px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '40px', cursor: 'pointer' }} onClick={() => router.push('/')}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#ef4444', marginRight: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>P</div>
        <h1 style={{ margin: 0, fontSize: '1.2rem', color: '#ef4444', fontWeight: 800 }}>PokePrice LIVE</h1>
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={[pathname]}
        items={menuItems}
        style={{ flex: 1, minWidth: 0, borderBottom: 'none' }}
      />
      <div style={{ width: '300px' }}>
        <Input.Search
          placeholder="카드 이름, 번호, 레어도 검색..."
          onSearch={handleSearch}
          enterButton={<SearchOutlined />}
        />
      </div>
    </Header>
  );
}
