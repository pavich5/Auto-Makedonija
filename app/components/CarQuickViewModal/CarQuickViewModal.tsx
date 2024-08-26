import React from 'react';
import { Modal, Button, Tag, Descriptions, Divider } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import styles from './CarQuickViewModal.module.css';


interface Car {
    id: number;
    title: string;
    vin: string;
    dealer: string;
    distance: string;
    price: number;
    monthly: string;
    downPayment: string;
    image: string;
    bodyType: string;
    make: string;
    model: string;
    year: number;
    mileage: number;
    driveType: string;
    transmissionType: string;
    engineCylinders: number;
    fuelType: string;
    mpg: number;
    exteriorColor: string;
    interiorColor: string;
    numberOfSeats: number;
    features: {
      technology: string[];
      safety: string[];
      premium: string[];
      convenience: string[];
      utility: string[];
    };
  }

interface CarQuickViewModalProps {
  isVisible: boolean;
  onClose: () => void;
  car: Car | null;
}

const CarQuickViewModal: React.FC<CarQuickViewModalProps> = ({ isVisible, onClose, car }) => {
    if (!car) return null;
  
    return (
      <Modal
        open={isVisible}
        onCancel={onClose}
        width={1000}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalBody}>
            <img src={car.image} alt={car.title} className={styles.modalImage} />
            <div className={styles.details}>
              <h2>{car.title}</h2>
              <div className={styles.detailItem}>
                <strong>VIN:</strong> {car.vin}
              </div>
              <div className={styles.detailItem}>
                <strong>Dealer:</strong> {car.dealer} ({car.distance})
              </div>
              <div className={styles.detailItem}>
                <strong>Price:</strong> ${car.price.toLocaleString()}
              </div>
              <div className={styles.detailItem}>
                <strong>Monthly Payment:</strong> {car.monthly}
              </div>
              <div className={styles.detailItem}>
                <strong>Down Payment:</strong> {car.downPayment}
              </div>
  
              <div className={styles.featuresSection}>
                <h3>Features</h3>
                {Object.entries(car.features).map(([category, features]) => (
                  <div key={category} className={styles.featureCategory}>
                    <strong>{category.charAt(0).toUpperCase() + category.slice(1)}:</strong>
                    <div className={styles.featureList}>
                      {features.map((feature, index) => (
                        <Tag key={index}>{feature}</Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          <Button type="primary"  className={styles.learnMoreButton}>
            Learn More <RightOutlined />
          </Button>
        </div>
      </Modal>
    );
  };
  
  export default CarQuickViewModal;