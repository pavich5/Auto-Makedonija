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
          <Card
  title="Review Car Details"
  style={{
    borderRadius: 12,
    maxWidth: 900,
    margin: "0 auto",
  }}
>
  {formData.image ? (
    <Image
      src={formData.image}
      alt="Car"
      width="100%"
      height={250}
      style={{
        objectFit: "cover",
        borderRadius: 8,
        marginBottom: 32,
        maxHeight: 300,
      }}
    />
  ) : (
    <Text>No image uploaded</Text>
  )}

  <div
    style={{
      overflowX: "auto",
      width: "100%",
    }}
  >
    <table
      style={{
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0 12px",
        minWidth: 320,
      }}
    >
      <tbody>
        {[
          ["Title", formData.title],
          ["VIN", formData.vin],
          ["Price", `$${formData.price}`],
          ["Mileage", `${formData.mileage} miles`],
          ["Dealer", formData.dealer],
          ["Distance", formData.distance],
          ["Body Type", formData.bodyType],
          ["Make", formData.make],
          ["Model", formData.model],
          ["Year", formData.year],
          ["Drive Type", formData.driveType],
          ["Transmission", formData.transmissionType],
          ["Engine Cylinders", formData.engineCylinders],
          ["Fuel Type", formData.fuelType],
          ["MPG", formData.mpg],
          ["Exterior Color", formData.exteriorColor],
          ["Interior Color", formData.interiorColor],
          ["Seats", formData.numberOfSeats],
          ["Phone", formData.phone],
          ["Email", formData.email],
        ].map(([label, value]) => (
          <tr
            key={label}
            style={{
              background: "#f9f9f9",
              borderRadius: 8,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <td
              style={{
                fontWeight: 600,
                padding: "12px 16px",
                flex: "1 1 40%",
              }}
            >
              {label}:
            </td>
            <td
              style={{
                padding: "12px 16px",
                flex: "1 1 55%",
                color: "#555",
              }}
            >
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div
    style={{
      marginTop: 32,
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 12,
    }}
  >
    <Button onClick={handlePrevious} style={{ flex: 1, minWidth: 120 }}>
      Previous
    </Button>
    <Button
      type="primary"
      onClick={handleNext}
      style={{ flex: 1, minWidth: 120 }}
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
