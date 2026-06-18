"use client";

import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Statistic, Descriptions, Button, Tag, notification } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, PlusOutlined } from '@ant-design/icons';
import { getCardById, Card as CardType } from '@/data/mockData';
import dynamic from 'next/dynamic';

// Dynamically import Line chart to avoid SSR issues with Ant Design Charts
const Line = dynamic(() => import('@ant-design/charts').then((mod) => mod.Line), { ssr: false });

const { Title, Text } = Typography;

export default function CardDetailPage({ params }: { params: { id: string } }) {
  const [card, setCard] = useState<CardType | null>(null);

  useEffect(() => {
    // In Next.js App Router, params are available as a prop
    const data = getCardById(params.id);
    if (data) {
      setCard(data);
    }
  }, [params.id]);

  if (!card) {
    return <div className="container" style={{ textAlign: 'center', marginTop: 100 }}>카드를 찾을 수 없습니다.</div>;
  }

  const chartData = card.price_history.map(item => ({
    date: item.date,
    price: item.price
  }));

  const chartConfig = {
    data: chartData,
    xField: 'date',
    yField: 'price',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
    color: '#ef4444',
  };

  const handleAddToCollection = () => {
    // In a real app, this would dispatch to a store or API
    // For MVP, we'll use a simple localStorage approach later, or just show a notification
    notification.success({
      message: '컬렉션 추가 완료',
      description: `${card.card_name} 카드가 내 컬렉션에 추가되었습니다.`,
      placement: 'bottomRight',
    });
  };

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <Row gutter={[40, 40]}>
        {/* Card Image */}
        <Col xs={24} md={10} lg={8}>
          <div style={{ backgroundColor: '#f0f2f5', padding: '40px', borderRadius: 16, display: 'flex', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <img 
              src={card.image_url} 
              alt={card.card_name} 
              style={{ width: '100%', maxWidth: '350px', objectFit: 'contain', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))' }} 
            />
          </div>
        </Col>

        {/* Card Details */}
        <Col xs={24} md={14} lg={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <Title level={2} style={{ margin: 0 }}>{card.card_name}</Title>
              <Text type="secondary" style={{ fontSize: '1.2rem' }}>{card.card_id} • {card.expansion_pack}</Text>
            </div>
            <Tag color="volcano" style={{ fontSize: '1.2rem', padding: '4px 12px' }}>{card.rarity}</Tag>
          </div>

          <Row gutter={24} style={{ marginTop: 32, marginBottom: 32 }}>
            <Col>
              <Card size="small" style={{ minWidth: 200, backgroundColor: '#fafafa', border: '1px solid #f0f0f0' }}>
                <Statistic
                  title="현재 시세"
                  value={card.current_price}
                  suffix="원"
                  valueStyle={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937' }}
                />
              </Card>
            </Col>
            <Col>
              <Card size="small" style={{ minWidth: 150, backgroundColor: '#fafafa', border: '1px solid #f0f0f0' }}>
                <Statistic
                  title="전일 대비"
                  value={Math.abs(card.price_change_percent)}
                  precision={1}
                  valueStyle={{ 
                    color: card.price_change_percent > 0 ? '#cf1322' : '#3f8600',
                    fontSize: '1.8rem',
                    fontWeight: 'bold'
                  }}
                  prefix={card.price_change_percent > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>

          <Button 
            type="primary" 
            size="large" 
            icon={<PlusOutlined />} 
            onClick={handleAddToCollection}
            style={{ marginBottom: 40, width: 200, height: 50, fontSize: '1.1rem', backgroundColor: '#ef4444' }}
          >
            내 컬렉션에 추가
          </Button>

          <Descriptions title="상세 정보" bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
            <Descriptions.Item label="카드명">{card.card_name}</Descriptions.Item>
            <Descriptions.Item label="카드 번호">{card.card_id}</Descriptions.Item>
            <Descriptions.Item label="레어도">{card.rarity}</Descriptions.Item>
            <Descriptions.Item label="수록 팩">{card.expansion_pack}</Descriptions.Item>
          </Descriptions>

          <div style={{ marginTop: 40 }}>
            <Title level={4}>시세 변동 추이</Title>
            <div style={{ height: 300, marginTop: 20 }}>
              {/* @ts-ignore - Line chart typings can be tricky with dynamic import */}
              <Line {...chartConfig} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
