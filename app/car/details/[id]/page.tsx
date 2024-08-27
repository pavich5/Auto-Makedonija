"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { Card, Col, Row, Typography, Divider, List, Image, Tag, Space, Tabs } from 'antd';
import { DollarOutlined, CarOutlined, CalendarOutlined, PhoneOutlined, RocketOutlined, BuildOutlined, EnvironmentOutlined, SafetyOutlined, TagOutlined, ToolOutlined } from '@ant-design/icons';
import styles from './page.module.css';
import { dummyData } from '@/app/data';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const CarDetailsPage = () => {
  const params = useParams<{ id: string; }>();
  const car = dummyData.find(car => car.id === parseInt(params.id));

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className={styles.container}>
      <Row gutter={24}>
        <Col span={24} md={12}>
          <div className={styles.topImage}>
            <Image width="100%" src={car.images[0]} />
          </div>
          <div className={styles.bottomImage}>
          <Image height="100%" width="50%" src={car.images[1]} />
          <Image height="100%" width="50%" src={car.images[2]} />
          </div>
        </Col>
        <Col span={24} md={12}>
          <Card className={styles.card}>
            <Title level={2}>{car.title}</Title>
            <Text strong><DollarOutlined /> Price:</Text> <Text>${car.price.toLocaleString()}</Text>
            <Divider />
            <Tabs defaultActiveKey="1" className={styles.tabs}>
              <TabPane tab="Overview" key="1">
                <Space direction="vertical" size="small" className={styles.details}>
                  <div><Text strong><CarOutlined /> VIN:</Text> <Text>{car.vin}</Text></div>
                  <div><Text strong><PhoneOutlined /> Dealer:</Text> <Text>{car.dealer}</Text></div>
                  <div><Text strong><EnvironmentOutlined /> Distance:</Text> <Text>{car.distance}</Text></div>
                  <div><Text strong><CarOutlined /> Body Type:</Text> <Text>{car.bodyType}</Text></div>
                  <div><Text strong><BuildOutlined /> Make:</Text> <Text>{car.make}</Text></div>
                  <div><Text strong><BuildOutlined /> Model:</Text> <Text>{car.model}</Text></div>
                  <div><Text strong><CalendarOutlined /> Year:</Text> <Text>{car.year}</Text></div>
                  <div><Text strong><RocketOutlined /> Mileage:</Text> <Text>{car.mileage.toLocaleString()} miles</Text></div>
                  <div><Text strong><CarOutlined /> Drive Type:</Text> <Text>{car.driveType}</Text></div>
                  <div><Text strong><BuildOutlined /> Transmission:</Text> <Text>{car.transmissionType}</Text></div>
                  <div><Text strong><BuildOutlined /> Engine Cylinders:</Text> <Text>{car.engineCylinders}</Text></div>
                  <div><Text strong><RocketOutlined /> Fuel Type:</Text> <Text>{car.fuelType}</Text></div>
                  <div><Text strong><RocketOutlined /> MPG:</Text> <Text>{car.mpg}</Text></div>
                  <div><Text strong><BuildOutlined /> Exterior Color:</Text> <Text>{car.exteriorColor}</Text></div>
                  <div><Text strong><BuildOutlined /> Interior Color:</Text> <Text>{car.interiorColor}</Text></div>
                  <div><Text strong><BuildOutlined /> Seats:</Text> <Text>{car.numberOfSeats}</Text></div>
                </Space>
              </TabPane>
              <TabPane tab="Features" key="2">
                <Row gutter={16}>
                  {Object.entries(car.features).map(([category, items]) => (
                    <Col span={24} md={12} key={category}>
                      <Title level={5}>
                        <Tag color="blue">{category.charAt(0).toUpperCase() + category.slice(1)}</Tag>
                      </Title>
                      <List
                        bordered
                        dataSource={items}
                        renderItem={item => (
                          <List.Item>
                            <Text>{item}</Text>
                          </List.Item>
                        )}
                      />
                    </Col>
                  ))}
                </Row>
              </TabPane>
              <TabPane tab="Specifications" key="3">
                <div className={styles.specs}>
                  <Row gutter={16}>
                    <Col span={24} md={12}>
                      <div><Text strong><CarOutlined /> Body Type:</Text> <Text>{car.bodyType}</Text></div>
                      <div><Text strong><BuildOutlined /> Make:</Text> <Text>{car.make}</Text></div>
                      <div><Text strong><BuildOutlined /> Model:</Text> <Text>{car.model}</Text></div>
                      <div><Text strong><CalendarOutlined /> Year:</Text> <Text>{car.year}</Text></div>
                    </Col>
                    <Col span={24} md={12}>
                      <div><Text strong><RocketOutlined /> Mileage:</Text> <Text>{car.mileage.toLocaleString()} miles</Text></div>
                      <div><Text strong><CarOutlined /> Drive Type:</Text> <Text>{car.driveType}</Text></div>
                      <div><Text strong><BuildOutlined /> Transmission:</Text> <Text>{car.transmissionType}</Text></div>
                      <div><Text strong><BuildOutlined /> Engine Cylinders:</Text> <Text>{car.engineCylinders}</Text></div>
                    </Col>
                  </Row>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CarDetailsPage;
