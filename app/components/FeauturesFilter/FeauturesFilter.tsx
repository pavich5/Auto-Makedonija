"use client"
import React, { useState } from 'react';
import { Modal, Checkbox, Drawer, Button } from 'antd';
import styles from './FeauturesFilter.module.css';

interface FeaturesFilterProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (filters: {
    technology: string[];
    safety: string[];
    premium: string[];
    convenience: string[];
    utility: string[];
  }) => void;
  isMobile: boolean;
  toggleMobileFilterVisibility:(filter:string) => void
}

interface FeatureOptions {
  [key: string]: string[];
}

const FeaturesFilter: React.FC<FeaturesFilterProps> = ({
  isVisible,
  onClose,
  onApply,
  isMobile,
  toggleMobileFilterVisibility
}) => {
  const [features, setFeatures] = useState<{
    technology: string[];
    safety: string[];
    premium: string[];
    convenience: string[];
    utility: string[];
  }>({
    technology: [],
    safety: [],
    premium: [],
    convenience: [],
    utility: [],
  });

  const handleFeatureChange = (category: keyof typeof features, selectedFeatures: string[]) => {
    setFeatures(prev => ({
      ...prev,
      [category]: selectedFeatures,
    }));
  };

  const handleOk = () => {
    onApply(features);
    onClose();
    if(isMobile){
      toggleMobileFilterVisibility("Features")
    }
  };

  const renderContent = () => (
    <div className={!isMobile ? styles.container : ''}>
      {Object.keys(features).map((category) => (
        <div key={category} className={styles.section}>
          <h4>{capitalizeFirstLetter(category)}</h4>
          <Checkbox.Group
            options={getFeatureOptions(category)}
            value={features[category as keyof typeof features]}
            onChange={(values) => handleFeatureChange(category as keyof typeof features, values as string[])}
          />
        </div>
      ))}
    </div>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          title="Features Filter"
          placement="bottom"
          closable={true}
          onClose={()=> toggleMobileFilterVisibility("Features")}
          open={isMobile}
          height="95%"
          footer={
            <div style={{ textAlign: 'right' }}>
              <Button onClick={()=> toggleMobileFilterVisibility("Features")} className={styles.footerButton} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" onClick={handleOk} className={styles.footerButton}>
                Apply
              </Button>
            </div>
          }
        >
          {renderContent()}
        </Drawer>
      ) : (
        <Modal
          title="Features Filter"
          visible={isVisible}
          onOk={handleOk}
          onCancel={onClose}
          okText="Apply"
          cancelText="Cancel"
          width={800}
          className={styles.modal}
        >
          {renderContent()}
        </Modal>
      )}
    </>
  );
};

const getFeatureOptions = (category: string): string[] => {
  const options: FeatureOptions = {
    technology: ['Android Auto / Apple Carplay', 'Heads-up Display', 'WiFi Capability', 'Bluetooth Audio'],
    safety: ['Blind Spot Warning', 'Automatic Emergency Braking', 'Parking Collision Warning', 'Lane Keep Assistance'],
    premium: ['Leather-appointed Seats', 'Sunroof', 'Premium Sound'],
    convenience: ['Keyless Ignition', 'Navigation System', 'Adaptive Cruise Control'],
    utility: ['Third Row Seat', 'Tow Hitch', 'Roof Rack', 'Bed or Cargo Liner'],
  };
  return options[category] || [];
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default FeaturesFilter;
