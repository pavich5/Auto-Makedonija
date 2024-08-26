import React, { useState } from 'react';
import { Modal, Checkbox, Slider, Drawer, Button } from 'antd';
import styles from './PerformanceFilter.module.css';

const { Group: CheckboxGroup } = Checkbox;

interface PerformanceFilterProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (filters: {
    driveType: string[];
    transmissionType: string[];
    engineCylinders: number[];
    fuelType: string[];
    mpgRange: [number, number];
  }) => void;
  isMobile: boolean;
  toggleMobileFilterVisibility: (filter:string) => void
}

const PerformanceFilter: React.FC<PerformanceFilterProps> = ({
  isVisible,
  onClose,
  onApply,
  isMobile,
  toggleMobileFilterVisibility
}) => {
  const [driveType, setDriveType] = useState<string[]>([]);
  const [transmissionType, setTransmissionType] = useState<string[]>([]);
  const [engineCylinders, setEngineCylinders] = useState<number[]>([]);
  const [fuelType, setFuelType] = useState<string[]>([]);
  const [mpgRange, setMpgRange] = useState<[number, number]>([0, 50]);

  const handleOk = () => {
    onApply({
      driveType,
      transmissionType,
      engineCylinders,
      fuelType,
      mpgRange,
    });
    onClose();
    if(isMobile){
      toggleMobileFilterVisibility("Performance")
    }
  };

  const renderContent = () => (
    <div className={!isMobile ? styles.container : ''}>
      <div className={styles.section}>
        <h4>Drive Type</h4>
        <CheckboxGroup
          options={['2WD', '4WD', 'AWD']}
          value={driveType}
          onChange={setDriveType}
        />
      </div>

      <div className={styles.section}>
        <h4>Transmission Type</h4>
        <CheckboxGroup
          options={['Automatic', 'Manual']}
          value={transmissionType}
          onChange={setTransmissionType}
        />
      </div>

      <div className={styles.section}>
        <h4>Engine Cylinders</h4>
        <CheckboxGroup
          options={['4', '6', '8', 'Other']}
          value={engineCylinders}
          onChange={values => setEngineCylinders(values as number[])}
        />
      </div>

      <div className={styles.section}>
        <h4>Fuel Type</h4>
        <CheckboxGroup
          options={['Gasoline', 'Diesel', 'Electric', 'Hybrid']}
          value={fuelType}
          onChange={setFuelType}
        />
      </div>

      <div className={styles.section}>
        <h4>Estimated MPG</h4>
        <Slider
          range
          min={0}
          max={100}
          value={mpgRange}
          onChange={(value) => setMpgRange(value as [number, number])}
          marks={{
            0: '0 MPG',
            100: '100 MPG'
          }}
          step={1}
        />
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          title="Performance Filter"
          placement="bottom"
          closable={true}
          onClose={() => toggleMobileFilterVisibility("Performance")}
          open={isMobile}
          height="75%"
          footer={
            <div style={{ textAlign: 'right' }}>
              <Button onClick={() => toggleMobileFilterVisibility("Performance")} className={styles.footerButton} style={{ marginRight: 8 }}>
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
          title="Performance Filter"
          visible={isVisible}
          onOk={handleOk}
          onCancel={onClose}
          okText="Apply"
          cancelText="Cancel"
          width={600}
          className={styles.modal}
        >
          {renderContent()}
        </Modal>
      )}
    </>
  );
};

export default PerformanceFilter;
