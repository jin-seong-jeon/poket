"use client";

import React, { useState, useEffect } from 'react';
import { Typography, Card, Statistic, Table, Button, Space, Popconfirm, message } from 'antd';
import { DeleteOutlined, WalletOutlined } from '@ant-design/icons';
import { getCardById } from '@/data/mockData';
import Link from 'next/link';

const { Title } = Typography;

interface CollectionItem {
  key: string;
  card_id: string;
  card_name: string;
  rarity: string;
  quantity: number;
  current_price: number;
  total_value: number;
}

export default function CollectionPage() {
  const [collection, setCollection] = useState<CollectionItem[]>([]);
  const [totalAssetValue, setTotalAssetValue] = useState(0);

  useEffect(() => {
    // Mocking an initial collection using local storage or default data
    const mockInitialCollection = [
      { id: 'SV8a-125', quantity: 1 },
      { id: 'SV6-130', quantity: 2 },
    ];

    const loadedCollection: CollectionItem[] = mockInitialCollection.map(item => {
      const card = getCardById(item.id);
      if (!card) return null;
      return {
        key: card.card_id,
        card_id: card.card_id,
        card_name: card.card_name,
        rarity: card.rarity,
        quantity: item.quantity,
        current_price: card.current_price,
        total_value: card.current_price * item.quantity,
      };
    }).filter(Boolean) as CollectionItem[];

    setCollection(loadedCollection);
  }, []);

  useEffect(() => {
    const total = collection.reduce((acc, item) => acc + item.total_value, 0);
    setTotalAssetValue(total);
  }, [collection]);

  const handleDelete = (key: string) => {
    const newCollection = collection.filter((item) => item.key !== key);
    setCollection(newCollection);
    message.success('컬렉션에서 제거되었습니다.');
  };

  const columns = [
    {
      title: '카드명',
      dataIndex: 'card_name',
      key: 'card_name',
      render: (text: string, record: CollectionItem) => (
        <Link href={`/card/${record.card_id}`} style={{ fontWeight: 'bold', color: '#1890ff' }}>
          {text}
        </Link>
      ),
    },
    {
      title: '카드 번호',
      dataIndex: 'card_id',
      key: 'card_id',
    },
    {
      title: '레어도',
      dataIndex: 'rarity',
      key: 'rarity',
    },
    {
      title: '현재 시세',
      dataIndex: 'current_price',
      key: 'current_price',
      render: (price: number) => `${price.toLocaleString()}원`,
    },
    {
      title: '수량',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '총 가치',
      dataIndex: 'total_value',
      key: 'total_value',
      render: (value: number) => <span style={{ fontWeight: 'bold', color: '#ef4444' }}>{value.toLocaleString()}원</span>,
    },
    {
      title: '관리',
      key: 'action',
      render: (_: any, record: CollectionItem) => (
        <Space size="middle">
          <Popconfirm title="정말로 삭제하시겠습니까?" onConfirm={() => handleDelete(record.key)}>
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <Title level={2} style={{ marginBottom: 30 }}>마이 컬렉션</Title>
      
      <Card style={{ marginBottom: 40, borderRadius: 12, backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Statistic
          title={<span style={{ fontSize: '1.2rem', color: '#64748b' }}>나의 총 자산 가치</span>}
          value={totalAssetValue}
          prefix={<WalletOutlined style={{ marginRight: 8, color: '#ef4444' }} />}
          suffix="원"
          valueStyle={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937' }}
        />
      </Card>

      <div style={{ backgroundColor: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <Title level={4} style={{ margin: 0 }}>보유 카드 목록</Title>
          <Button type="primary" style={{ backgroundColor: '#ef4444' }}>
            새로운 카드 등록
          </Button>
        </div>
        <Table 
          columns={columns} 
          dataSource={collection} 
          pagination={false}
          scroll={{ x: 800 }}
        />
      </div>
    </div>
  );
}
