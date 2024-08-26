"use client";
import React, { useState } from 'react';
import { Modal, Checkbox, Select, Drawer, Button } from 'antd';
import styles from './MoreFilters.module.css';

const { Option } = Select;

interface MoreFiltersProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (filters: {
    exteriorColor: string[];
    interiorColor: string[];
    numberOfSeats: number[];
  }) => void;
  isMobile: boolean;
  toggleMobileFilterVisibility:(filter:string) => void
}

const MoreFilters: React.FC<MoreFiltersProps> = ({
  isVisible,
  onClose,
  onApply,
  isMobile,
  toggleMobileFilterVisibility
}) => {
  const [exteriorColor, setExteriorColor] = useState<string[]>([]);
  const [interiorColor, setInteriorColor] = useState<string[]>([]);
  const [numberOfSeats, setNumberOfSeats] = useState<number[]>([]);

  const handleOk = () => {
    onApply({
      exteriorColor,
      interiorColor,
      numberOfSeats,
    });
    onClose();
    if(isMobile){
      toggleMobileFilterVisibility('More Filters')
    }
  };

  const renderContent = () => (
    <div className={styles.container}>
      <div className={styles.section}>
        <h4>Exterior Color</h4>
        <Checkbox.Group
          options={getColorOptions().map(color => ({
            label: (
              <div className={styles.colorOption}>
                <span
                  className={`${styles.colorExample}`}
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </div>
            ),
            value: color.name,
          }))}
          value={exteriorColor}
          onChange={setExteriorColor}
        />
      </div>

      <div className={styles.section}>
        <h4>Interior Color</h4>
        <Checkbox.Group
          options={getColorOptions().map(color => ({
            label: (
              <div className={styles.colorOption}>
                <span
                  className={`${styles.colorExample}`}
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </div>
            ),
            value: color.name,
          }))}
          value={interiorColor}
          onChange={setInteriorColor}
        />
      </div>

      <div className={styles.section}>
        <h4>Number of Seats</h4>
        <Select
          mode="multiple"
          placeholder="Select number of seats"
          value={numberOfSeats}
          onChange={(values) => setNumberOfSeats(values as number[])}
          style={{ width: '100%' }}
        >
          {getNumberOfSeatsOptions().map(seatCount => (
            <Option key={seatCount} value={seatCount}>
              {seatCount}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          title="More Filters"
          placement="bottom"
          closable={true}
          onClose={()=> toggleMobileFilterVisibility('More Filters')}
          open={isMobile}
          height="75%"
          footer={
            <div style={{ textAlign: 'right' }}>
              <Button onClick={()=> toggleMobileFilterVisibility('More Filters')} className={styles.footerButton} style={{ marginRight: 8 }}>
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
          title="More Filters"
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

const getColorOptions = () => {
  return [
    { name: 'Red', hex: '#ff4d4f' },
    { name: 'Blue', hex: '#1890ff' },
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Silver', hex: '#c0c0c0' },
    { name: 'Gray', hex: '#808080' },
  ];
};

const getNumberOfSeatsOptions = (): number[] => {
  return [2, 4, 5, 7, 8];
};

export default MoreFilters;
