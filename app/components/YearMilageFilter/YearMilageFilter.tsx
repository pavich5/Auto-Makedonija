import React, { useState } from 'react';
import { Slider, Modal, InputNumber, Row, Col, Drawer, Button } from 'antd';

interface YearMilageFilterProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (yearRange: [number, number], mileageRange: [number, number]) => void;
  isMobile: boolean;
  toggleMobileFilterVisibility:(filter : string) => void
}

const YearMilageFilter: React.FC<YearMilageFilterProps> = ({ isVisible, onClose, onApply, isMobile,toggleMobileFilterVisibility }) => {
  const [yearRange, setYearRange] = useState<[number, number]>([2000, 2024]);
  const [mileageRange, setMileageRange] = useState<[number, number]>([0, 100000]);

  const handleOk = () => {
    onApply(yearRange, mileageRange);
    onClose();
    if(isMobile){
      toggleMobileFilterVisibility('Year & Milage')
    }
  };

  const renderContent = () => (
    <>
      <div style={{ marginBottom: 20 }}>
        <h4>Year Range</h4>
        <Slider
          range
          min={2000}
          max={2024}
          value={yearRange}
          onChange={(value) => setYearRange(value as [number, number])}
          marks={{
            2000: '2000',
            2024: '2024'
          }}
        />
        <Row gutter={16}>
          <Col span={12}>
            <InputNumber
              min={2000}
              max={2024}
              style={{ width: '100%' }}
              value={yearRange[0]}
              onChange={value => setYearRange([value as number, yearRange[1]])}
            />
          </Col>
          <Col span={12}>
            <InputNumber
              min={2000}
              max={2024}
              style={{ width: '100%' }}
              value={yearRange[1]}
              onChange={value => setYearRange([yearRange[0], value as number])}
            />
          </Col>
        </Row>
      </div>
      <div>
        <h4>Mileage Range (in miles)</h4>
        <Slider
          range
          min={0}
          max={100000}
          value={mileageRange}
          onChange={(value) => setMileageRange(value as [number, number])}
          marks={{
            0: '0',
            100000: '100,000'
          }}
        />
        <Row gutter={16}>
          <Col span={12}>
            <InputNumber
              min={0}
              max={100000}
              style={{ width: '100%' }}
              value={mileageRange[0]}
              onChange={value => setMileageRange([value as number, mileageRange[1]])}
            />
          </Col>
          <Col span={12}>
            <InputNumber
              min={0}
              max={100000}
              style={{ width: '100%' }}
              value={mileageRange[1]}
              onChange={value => setMileageRange([mileageRange[0], value as number])}
            />
          </Col>
        </Row>
      </div>
    </>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          title="Year & Mileage Filter"
          placement="bottom"
          closable={true}
          onClose={() => toggleMobileFilterVisibility('Year & Milage')}
          open={isMobile}
          height="50%"
          footer={
            <div style={{ textAlign: 'right' }}>
              <Button onClick={() => toggleMobileFilterVisibility('Year & Milage')} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" onClick={handleOk}>
                Apply
              </Button>
            </div>
          }
        >
          {renderContent()}
        </Drawer>
      ) : (
        <Modal
          title="Year & Mileage Filter"
          visible={isVisible}
          onOk={handleOk}
          onCancel={onClose}
          okText="Apply"
          cancelText="Cancel"
          width={600}
        >
          {renderContent()}
        </Modal>
      )}
    </>
  );
};

export default YearMilageFilter;
