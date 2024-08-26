"use client";
import React, { useState } from 'react';
import { Form, Input, Button, Upload, Steps, Card, message, Row, Col, Typography, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

const { Step } = Steps;
const { Title, Text } = Typography;

interface CarFormData {
  title?: string;
  vin?: string;
  price?: string;
  mileage?: string;
  dealer?: string;
  distance?: string;
  bodyType?: string;
  make?: string;
  model?: string;
  year?: string;
  driveType?: string;
  transmissionType?: string;
  engineCylinders?: string;
  fuelType?: string;
  mpg?: string;
  exteriorColor?: string;
  interiorColor?: string;
  numberOfSeats?: string;
  phone?: string;
  email?: string;
  image?: string;
}

const SellYourCar: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<CarFormData>({});
  const [fileList, setFileList] = useState<any[]>([]);
  const [form] = Form.useForm();
  const router = useRouter()
  const handleNext = () => {
    if (currentStep === 0) {
      form.validateFields()
        .then(values => {
          setFormData(prev => ({ ...prev, ...values }));
          setCurrentStep(prev => prev + 1);
        })
        .catch(info => {
          message.error('Please fill in all required fields.');
        });
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleFinish = () => {
    message.success('Car listing submitted successfully!');
    router.push('/shopping/inventory')
  };

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);

    const file = fileList[0]?.originFileObj;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: previewUrl }));
    }
  };
  const isNextDisabled = () => {
    if (currentStep === 0) {
      return !form.isFieldsTouched(true) || form.getFieldsError().some(({ errors }) => errors.length);
    }
    return false;
  };

 
  return (
    <div className={styles.container}>
      <Steps current={currentStep} className={styles.steps}>
        <Step title="Add Car Details" />
        <Step title="Upload Images" />
        <Step title="Review Car Details" />
        <Step title="Review & Submit" />
      </Steps>

      <div className={styles.stepContent}>
        {currentStep === 0 && (
          <Form
            form={form}
            layout="vertical"
            onValuesChange={(changedValues) => setFormData({ ...formData, ...changedValues })}
            className={styles.form}
          >
            <Title level={3} className={styles.sectionTitle}>Car Details</Title>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Car Title"
                  name="title"
                  rules={[{ required: true, message: 'Please input the car title!' }]}
                >
                  <Input placeholder="Enter car title" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="VIN"
                  name="vin"
                  rules={[{ required: true, message: 'Please input the VIN!' }]}
                >
                  <Input placeholder="Enter VIN" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[{ required: true, message: 'Please input the price!' }]}
                >
                  <Input prefix="$" placeholder="Enter price" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Mileage"
                  name="mileage"
                  rules={[{ required: true, message: 'Please input the mileage!' }]}
                >
                  <Input placeholder="Enter mileage" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Dealer"
                  name="dealer"
                  rules={[{ required: true, message: 'Please input the dealer!' }]}
                >
                  <Input placeholder="Enter dealer name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Distance"
                  name="distance"
                  rules={[{ required: true, message: 'Please input the distance!' }]}
                >
                  <Input placeholder="Enter distance" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Body Type"
              name="bodyType"
              rules={[{ required: true, message: 'Please input the body type!' }]}
            >
              <Input placeholder="Enter body type" />
            </Form.Item>
            <Form.Item
              label="Make"
              name="make"
              rules={[{ required: true, message: 'Please input the make!' }]}
            >
              <Input placeholder="Enter make" />
            </Form.Item>
            <Form.Item
              label="Model"
              name="model"
              rules={[{ required: true, message: 'Please input the model!' }]}
            >
              <Input placeholder="Enter model" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Year"
                  name="year"
                  rules={[{ required: true, message: 'Please input the year!' }]}
                >
                  <Input placeholder="Enter year" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Drive Type"
                  name="driveType"
                  rules={[{ required: true, message: 'Please input the drive type!' }]}
                >
                  <Input placeholder="Enter drive type" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Transmission Type"
                  name="transmissionType"
                  rules={[{ required: true, message: 'Please input the transmission type!' }]}
                >
                  <Input placeholder="Enter transmission type" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Engine Cylinders"
                  name="engineCylinders"
                  rules={[{ required: true, message: 'Please input the engine cylinders!' }]}
                >
                  <Input placeholder="Enter engine cylinders" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Fuel Type"
                  name="fuelType"
                  rules={[{ required: true, message: 'Please input the fuel type!' }]}
                >
                  <Input placeholder="Enter fuel type" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="MPG"
                  name="mpg"
                  rules={[{ required: true, message: 'Please input the MPG!' }]}
                >
                  <Input placeholder="Enter MPG" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Exterior Color"
                  name="exteriorColor"
                  rules={[{ required: true, message: 'Please input the exterior color!' }]}
                >
                  <Input placeholder="Enter exterior color" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Interior Color"
                  name="interiorColor"
                  rules={[{ required: true, message: 'Please input the interior color!' }]}
                >
                  <Input placeholder="Enter interior color" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Number of Seats"
              name="numberOfSeats"
              rules={[{ required: true, message: 'Please input the number of seats!' }]}
            >
              <Input placeholder="Enter number of seats" />
            </Form.Item>

            <Title level={3} className={styles.sectionTitle}>Your Details</Title>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input placeholder="Enter phone number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                >
                  <Input type="email" placeholder="Enter email" />
                </Form.Item>
              </Col>
            </Row>

            <div className={styles.buttonGroup}>
              <Button type="primary" onClick={handleNext} className={styles.nextButton} disabled={isNextDisabled()}>
                Next
              </Button>
            </div>
          </Form>
        )}

        {currentStep === 1 && (
          <div>
            <Upload
              fileList={fileList}
              onChange={handleFileChange}
              listType="picture-card"
              className={styles.upload}
              action="/upload"
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
            <div className={styles.buttonGroup}>
              <Button onClick={handlePrevious} className={styles.prevButton}>
                Previous
              </Button>
              <Button type="primary" onClick={handleNext} className={styles.nextButton}>
                Next
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <Card title="Review Car Details" className={styles.reviewCard}>
            <Row gutter={16}>
              <Col span={12}>
              {formData.image ? (
                  <Image src={formData.image} alt="Car" className={styles.reviewImage} />
                ) : (
                  <Text>No image uploaded</Text>
                )}              </Col>
              <Col span={12}>
                <div className={styles.details}>
                  <Title level={4}>{formData.title}</Title>
                  <Text>VIN: {formData.vin}</Text>
                  <Text>Price: ${formData.price}</Text>
                  <Text>Mileage: {formData.mileage} miles</Text>
                  <Text>Dealer: {formData.dealer}</Text>
                  <Text>Distance: {formData.distance}</Text>
                  <Text>Body Type: {formData.bodyType}</Text>
                  <Text>Make: {formData.make}</Text>
                  <Text>Model: {formData.model}</Text>
                  <Text>Year: {formData.year}</Text>
                  <Text>Drive Type: {formData.driveType}</Text>
                  <Text>Transmission Type: {formData.transmissionType}</Text>
                  <Text>Engine Cylinders: {formData.engineCylinders}</Text>
                  <Text>Fuel Type: {formData.fuelType}</Text>
                  <Text>MPG: {formData.mpg}</Text>
                  <Text>Exterior Color: {formData.exteriorColor}</Text>
                  <Text>Interior Color: {formData.interiorColor}</Text>
                  <Text>Number of Seats: {formData.numberOfSeats}</Text>
                  <Text>Phone: {formData.phone}</Text>
                  <Text>Email: {formData.email}</Text>
                </div>
              </Col>
            </Row>
            <div className={styles.buttonGroup}>
              <Button onClick={handlePrevious} className={styles.prevButton}>
                Previous
              </Button>
              <Button type="primary" onClick={handleNext} className={styles.nextButton}>
                Next
              </Button>
            </div>
          </Card>
        )}

        {currentStep === 3 && (
          <div>
            <Title level={2}>Thank you for submitting your car!</Title>
            <Button type="primary" onClick={handleFinish} className={styles.finishButton}>
              Finish
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellYourCar;
