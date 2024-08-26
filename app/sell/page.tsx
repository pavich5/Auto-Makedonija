"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Steps,
  Card,
  message,
  Row,
  Col,
  Typography,
  Image,
  InputNumber,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { carModels } from "../data";
const { Option } = Select;

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
  const [selectedMake, setSelectedMake] = useState<string | undefined>(
    undefined
  );
  const [form] = Form.useForm();
  const router = useRouter();
  const handleNext = () => {
    if (currentStep === 0) {
      form
        .validateFields()
        .then((values) => {
          setFormData((prev) => ({ ...prev, ...values }));
          setCurrentStep((prev) => prev + 1);
        })
        .catch((info) => {
          message.error("Please fill in all required fields.");
        });
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleMakeChange = (value: string) => {
    setSelectedMake(value);
    setFormData((prev) => ({ ...prev, make: value }));
    form.setFieldsValue({ model: undefined });
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleFinish = () => {
    message.success("Car listing submitted successfully!");
    router.push("/shopping/inventory");
  };

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);

    const file = fileList[0]?.originFileObj;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: previewUrl }));
    }
  };
  const isNextDisabled = () => {
    if (currentStep === 0) {
      const fieldValues = form.getFieldsValue();
      const requiredFields = [
        'bodyType',
        'dealer',
        'distance',
        'driveType',
        'email',
        'engineCylinders',
        'exteriorColor',
        'fuelType',
        'interiorColor',
        'make',
        'model',
        'numberOfSeats',
        'phone',
        'title',
        'transmissionType',
        'vin',

      ];
      return requiredFields.some(field => !fieldValues[field]);
    }
    return false;
  };
  

  console.log(formData)
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
            onValuesChange={(changedValues) =>
              setFormData({ ...formData, ...changedValues })
            }
            className={styles.form}
          >
            <Title level={3} className={styles.sectionTitle}>
              Car Details
            </Title>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Car Title"
                  name="title"
                  rules={[
                    { required: true, message: "Please input the car title!" },
                  ]}
                >
                  <Input placeholder="Enter car title" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="VIN"
                  name="vin"
                  rules={[{ required: true, message: "Please input the VIN!" }]}
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
                  rules={[
                    { required: true, message: "Please input the price!" },
                  ]}
                >
                  <InputNumber
                    min={1}
                    max={100000}
                    defaultValue={1000}
                    placeholder="Enter Price"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Mileage"
                  name="mileage"
                  rules={[
                    { required: true, message: "Please input the mileage!" },
                  ]}
                >
                  <InputNumber
                    min={1}
                    max={500000}
                    defaultValue={1000}
                    placeholder="Enter Mileage"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Dealer"
                  name="dealer"
                  rules={[
                    { required: true, message: "Please input the dealer!" },
                  ]}
                >
                  <Input placeholder="Enter dealer name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Distance"
                  name="distance"
                  rules={[
                    { required: true, message: "Please input the distance!" },
                  ]}
                >
                  <Input placeholder="Enter distance" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Body Type"
              name="bodyType"
              rules={[
                { required: true, message: "Please input the body type!" },
              ]}
            >
              <Select
                placeholder="Enter Body Type"
                style={{ width: "100%" }}
                className={styles.sortSelect}
              >
                <Option value="SUV">SUV</Option>
                <Option value="Sedan">Sedan</Option>
                <Option value="Hatchback">Hatchback</Option>
                <Option value="Truck">Truck</Option>
                <Option value="Coupe">Coupe</Option>
                <Option value="Convertible">Convertible</Option>
                <Option value="Van">Van</Option>
                <Option value="Wagon">Wagon</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Make"
              name="make"
              rules={[{ required: true, message: "Please input the make!" }]}
            >
              <Select
                placeholder="Select Make"
                style={{ width: "100%" }}
                className={styles.sortSelect}
                onChange={handleMakeChange}
              >
                {Object.keys(carModels).map((make) => (
                  <Option key={make} value={make}>
                    {make}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Model"
              name="model"
              rules={[{ required: true, message: "Please input the model!" }]}
            >
              <Select
                placeholder="Select Model"
                style={{ width: "100%" }}
                className={styles.sortSelect}
                disabled={!selectedMake}
              >
                {selectedMake &&
                //@ts-ignore
                  carModels[selectedMake]?.map((model) => (
                    <Option key={model} value={model}>
                      {model}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Year"
                  name="year"
                  rules={[
                    { required: true, message: "Please input the year!" },
                  ]}
                >
                  <InputNumber
                    min={1950}
                    max={2025}
                    defaultValue={2024}
                    placeholder="Enter Year"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Drive Type"
                  name="driveType"
                  rules={[
                    { required: true, message: "Please input the drive type!" },
                  ]}
                >
                  <Select
                    placeholder="Enter drive type"
                    style={{ width: "100%" }}
                    className={styles.sortSelect}
                  >
                    <Option value="2WD">2WD</Option>
                    <Option value="4WD">4WD</Option>
                    <Option value="AWD">AWD</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Transmission Type"
                  name="transmissionType"
                  rules={[
                    {
                      required: true,
                      message: "Please input the transmission type!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Enter Transmission Type"
                    style={{ width: "100%" }}
                    className={styles.sortSelect}
                  >
                    <Option value="Automatic">Automatic</Option>
                    <Option value="Manual">Manual</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Engine Cylinders"
                  name="engineCylinders"
                  rules={[
                    {
                      required: true,
                      message: "Please input the engine cylinders!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Enter Engine Cylinders"
                    style={{ width: "100%" }}
                    className={styles.sortSelect}
                  >
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="8">8</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Fuel Type"
                  name="fuelType"
                  rules={[
                    { required: true, message: "Please input the fuel type!" },
                  ]}
                >
                  <Select
                    placeholder="Enter Fuel Type"
                    style={{ width: "100%" }}
                    className={styles.sortSelect}
                  >
                    <Option value="Gasoline">Gasoline</Option>
                    <Option value="Diesel">Diesel</Option>
                    <Option value="Electric">Electric</Option>
                    <Option value="Hybrid">Hybrid</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="MPG"
                  name="mpg"
                  rules={[{ required: true, message: "Please input the MPG!" }]}
                >
                  <InputNumber
                    min={1}
                    max={50}
                    defaultValue={10}
                    placeholder="Enter Estimated MPG"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Exterior Color"
                  name="exteriorColor"
                  rules={[
                    {
                      required: true,
                      message: "Please input the exterior color!",
                    },
                  ]}
                >
                  <Input placeholder="Enter exterior color" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Interior Color"
                  name="interiorColor"
                  rules={[
                    {
                      required: true,
                      message: "Please input the interior color!",
                    },
                  ]}
                >
                  <Input placeholder="Enter interior color" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Number of Seats"
              name="numberOfSeats"
              rules={[
                {
                  required: true,
                  message: "Please input the number of seats!",
                },
              ]}
            >
              <Select
                placeholder="Enter Number of Seats"
                style={{ width: "100%" }}
                className={styles.sortSelect}
              >
                <Option value="2">2</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="7">7</Option>
                <Option value="8+">8+</Option>
              </Select>
            </Form.Item>

            <Title level={3} className={styles.sectionTitle}>
              Your Details
            </Title>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input placeholder="Enter phone number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please input a valid email!",
                    },
                  ]}
                >
                  <Input type="email" placeholder="Enter email" />
                </Form.Item>
              </Col>
            </Row>

            <div className={styles.buttonGroup}>
              <Button
                type="primary"
                onClick={handleNext}
                className={styles.nextButton}
                disabled={isNextDisabled()}
              >
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
              <Button
                type="primary"
                onClick={handleNext}
                className={styles.nextButton}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <Card title="Review Car Details" className={styles.reviewCard}>
            <Row gutter={16} className={styles.cardRow}>
              <Col span={12}>
                {formData.image ? (
                  <Image
                    src={formData.image}
                    alt="Car"
                    className={styles.reviewImage}
                    height={150}
                    width={200}
                  />
                ) : (
                  <Text>No image uploaded</Text>
                )}
              </Col>
              <Col span={12} className={styles.detailsRow}>
                <div className={styles.details}>
                  <div className={styles.detailsWrapper}>
                    <Title level={4}>Title: {formData.title}</Title>
                    <div>
                      <p>VIN: &nbsp;</p>
                      <p>{formData.vin}</p>
                    </div>
                    <div>
                      <p>Price:&nbsp;</p>
                      <p>${formData.price}</p>
                    </div>
                    <div>
                      <p>Mileage:&nbsp;</p>
                      <p>{formData.mileage} miles</p>
                    </div>
                    <div>
                      <p>Dealer:&nbsp;</p>
                      <p>{formData.dealer}</p>
                    </div>
                    <div>
                      <p>Distance:&nbsp;</p>
                      <p>{formData.distance}</p>
                    </div>
                    <div>
                      <p>Body Type:&nbsp;</p>
                      <p>{formData.bodyType}</p>
                    </div>
                    <div>
                      <p>Make:&nbsp;</p>
                      <p>{formData.make}</p>
                    </div>
                    <div>
                      <p>Model:&nbsp;</p>
                      <p>{formData.model}</p>
                    </div>
                    <div>
                      <p>Year:&nbsp;</p>
                      <p>{formData.year}</p>
                    </div>
                    <div>
                      <p>Drive Type:&nbsp;</p>
                      <p>{formData.driveType}</p>
                    </div>
                    <div>
                      <p>Transmission Type:&nbsp;</p>
                      <p>{formData.transmissionType}</p>
                    </div>
                    <div>
                      <p>Engine Cylinders:&nbsp;</p>
                      <p>{formData.engineCylinders}</p>
                    </div>
                    <div>
                      <p>Fuel Type:&nbsp;</p>
                      <p>{formData.fuelType}</p>
                    </div>
                    <div>
                      <p>MPG:&nbsp;</p>
                      <p>{formData.mpg}</p>
                    </div>
                    <div>
                      <p>Exterior Color:&nbsp;</p>
                      <p>{formData.exteriorColor}</p>
                    </div>
                    <div>
                      <p>Interior Color:&nbsp;</p>
                      <p>{formData.interiorColor}</p>
                    </div>
                    <div>
                      <p>Number of Seats:&nbsp;</p>
                      <p>{formData.numberOfSeats}</p>
                    </div>
                    <div>
                      <p>Phone:&nbsp;</p>
                      <p>{formData.phone}</p>
                    </div>
                    <div>
                      <p>Email:&nbsp;</p>
                      <p>{formData.email}</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className={styles.buttonGroup}>
              <Button onClick={handlePrevious} className={styles.prevButton}>
                Previous
              </Button>
              <Button
                type="primary"
                onClick={handleNext}
                className={styles.nextButton}
              >
                Next
              </Button>
            </div>
          </Card>
        )}

        {currentStep === 3 && (
          <div>
            <Title level={2}>Thank you for submitting your car!</Title>
            <Button
              type="primary"
              onClick={handleFinish}
              className={styles.finishButton}
            >
              Finish
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellYourCar;
