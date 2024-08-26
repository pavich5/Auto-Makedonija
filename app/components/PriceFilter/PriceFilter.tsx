import React, { useState } from 'react';
import { Slider, InputNumber, Row, Col, Modal, Drawer, Button } from 'antd';
import styles from './PriceFilter.module.css';

interface PriceFilterProps {
  min?: number;
  max?: number;
  onPriceChange: (value: [number, number]) => void;
  isVisible: boolean;
  onClose: () => void;
  isMobile: boolean;
  toggleMobileFilterVisibility:(filter:string) => void
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  min = 0,
  max = 100000,
  onPriceChange,
  isVisible,
  onClose,
  isMobile,
  toggleMobileFilterVisibility
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([min, max]);

  const handleSliderChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const handleInputChange = (value: number | null, index: number) => {
    if (value !== null) {
      const newRange = [...priceRange] as [number, number];
      newRange[index] = value;
      setPriceRange(newRange);
    }
  };

  const handleApply = () => {
    onPriceChange(priceRange);
    onClose(); 
    if(isMobile){
      toggleMobileFilterVisibility('Price')
    }
  };

  const renderContent = () => (
    <div className={styles.priceFilterContainer}>
      <Row gutter={16}>
        <Col span={10}>
          <InputNumber
            min={min}
            max={max}
            value={priceRange[0]}
            onChange={(value) => handleInputChange(value, 0)}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => {
              if (!value) return min;
              return parseFloat(value.replace(/\$\s?|(,*)/g, '')) || min;
            }}
          />
        </Col>
        <Col span={4} className={styles.sliderSpacer}>
          <span>to</span>
        </Col>
        <Col span={10}>
          <InputNumber
            min={min}
            max={max}
            value={priceRange[1]}
            onChange={(value) => handleInputChange(value, 1)}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => {
              if (!value) return max;
              return parseFloat(value.replace(/\$\s?|(,*)/g, '')) || max;
            }}
          />
        </Col>
      </Row>
      <Slider
        range
        min={min}
        max={max}
        value={priceRange}
        onChange={(value) => handleSliderChange(value as [number, number])}
        className={styles.priceSlider}
      />
    </div>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          title="Filter by Price"
          placement="bottom"
          closable={true}
          onClose={() => toggleMobileFilterVisibility('Price')}
          open={isMobile}
          height="33%"
          footer={
            <div className={styles.drawerFooter}>
              <Button onClick={() => toggleMobileFilterVisibility('Price')}>Cancel</Button>
              <Button style={{marginLeft: "5px"}} type="primary" onClick={handleApply}>
                Apply
              </Button>
            </div>
          }
        >
          {renderContent()}
        </Drawer>
      ) : (
        <Modal
          title="Filter by Price"
          visible={isVisible}
          onCancel={onClose}
          footer={[
            <Button key="cancel" onClick={onClose}>
              Cancel
            </Button>,
            <Button  key="apply" type="primary" onClick={handleApply}>
              Apply
            </Button>,
          ]}
        >
          {renderContent()}
        </Modal>
      )}
    </>
  );
};

export default PriceFilter;
