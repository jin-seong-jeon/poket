"use client";

import React from 'react';
import { Carousel, Row, Col, Card, Typography, Statistic, Tag, Divider, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { mockExpansions, getTopCards } from '@/data/mockData';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

export default function Dashboard() {
  const router = useRouter();
  const topCards = getTopCards();

  return (
    <div className="container">
      {/* Carousel Section */}
      <div style={{ marginBottom: 40, borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Carousel autoplay>
          {mockExpansions.map((pack) => (
            <div key={pack.id} style={{ position: 'relative' }}>
              <img 
                src={pack.banner_url} 
                alt={pack.name} 
                style={{ width: '100%', height: '300px', objectFit: 'cover' }} 
              />
              <div style={{
                position: 'absolute',
                bottom: 20,
                left: 20,
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '10px 20px',
                borderRadius: 8,
                color: 'white'
              }}>
                <h3 style={{ margin: 0, color: '#fff' }}>{pack.name}</h3>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>발매일: {pack.release_date}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <Divider orientation="left">
        <Title level={3} style={{ margin: 0 }}>🔥 급상승 인기 카드 Top 10</Title>
      </Divider>

      {/* Top Cards Grid */}
      <Row gutter={[24, 24]}>
        {topCards.map((card, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={card.card_id}>
            <Card
              hoverable
              cover={
                <div style={{ padding: '20px', backgroundColor: '#f0f2f5', display: 'flex', justifyContent: 'center' }}>
                  <img alt={card.card_name} src={card.image_url} style={{ height: 200, objectFit: 'contain' }} />
                </div>
              }
              onClick={() => router.push(`/card/${card.card_id}`)}
              style={{ borderRadius: 12, overflow: 'hidden' }}
              bodyStyle={{ padding: '16px' }}
            >
              <Card.Meta 
                title={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{card.card_name}</span>
                    <Tag color="volcano">{card.rarity}</Tag>
                  </div>
                }
                description={<Text type="secondary" style={{ fontSize: '0.8rem' }}>{card.expansion_pack}</Text>} 
              />
              <div style={{ marginTop: 16 }}>
                <Statistic
                  value={card.current_price}
                  suffix="원"
                  valueStyle={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                />
                <Statistic
                  value={Math.abs(card.price_change_percent)}
                  precision={1}
                  valueStyle={{ 
                    color: card.price_change_percent > 0 ? '#cf1322' : '#3f8600',
                    fontSize: '0.9rem'
                  }}
                  prefix={card.price_change_percent > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  suffix="%"
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
