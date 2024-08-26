import React, { useState } from "react";
import { Button, Modal, Drawer } from "antd";
import {
  CarOutlined,
  ApartmentOutlined,
  HomeOutlined,
  PicCenterOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  TruckOutlined,
  DownSquareOutlined,
} from "@ant-design/icons";
import styles from "./BodyTypeDropdown.module.css";

type BodyType = {
  label: string;
  value: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

type BodyTypeDropdownProps = {
  onSelect: (selectedBodyTypes: string[]) => void;
  isMobile: boolean;
  toggleMobileFilterVisibility:(filter:string) => void
};

const bodyTypes: BodyType[] = [
  { label: "SUV", value: "SUV", icon: <CarOutlined /> },
  { label: "Sedan", value: "Sedan", icon: <ApartmentOutlined /> },
  { label: "Hatchback", value: "hatchback", icon: <HomeOutlined /> },
  { label: "Truck", value: "Truck", icon: <TruckOutlined /> },
  { label: "Coupe", value: "Coupe", icon: <ThunderboltOutlined /> },
  { label: "Convertible", value: "Convertible", icon: <PicCenterOutlined /> },
  { label: "Van", value: "Van", icon: <RocketOutlined /> },
  { label: "Wagon", value: "Wagon", icon: <CarOutlined />, disabled: true },
];

const BodyTypeDropdown: React.FC<BodyTypeDropdownProps> = ({
  onSelect,
  isMobile,
  toggleMobileFilterVisibility
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    setSelectedBodyTypes((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  const handleApply = () => {
    onSelect(selectedBodyTypes);
    setVisible(false);
    if(isMobile){
    toggleMobileFilterVisibility('Body Type')
    }
  };

  const handleClear = () => {
    setSelectedBodyTypes([]);
  };


  const renderContent = () => (
    <>
      <div className={styles.bodyTypeGrid}>
        {bodyTypes.map((type) => (
          <Button
            type="default"
            key={type.value}
            disabled={type.disabled}
            className={`${styles.bodyTypeButton} ${
              selectedBodyTypes.includes(type.value) ? styles.selected : ""
            }`}
            onClick={() => handleSelect(type.value)}
          >
            <div className={styles.bodyTypeIcon}>{type.icon}</div>
            <span>{type.label}</span>
          </Button>
        ))}
      </div>
      <div className={styles.footer}>
        <Button type="primary" onClick={handleApply}>
          Apply
        </Button>
        <Button
          style={{ marginRight: "10px" }}
          type="default"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>
    </>
  );

  return (
    <>
      <Button style={{ border: "none" }} onClick={() => setVisible(true)}>
        Body Type <DownSquareOutlined />
      </Button>

      {isMobile ? (
        <Drawer
          title="Body Type"
          placement="bottom"
          closable={true}
          onClose={() => toggleMobileFilterVisibility('Body Type')}
          open={isMobile}
          height="55%"
          className={styles.drawer}
        >
          {renderContent()}
        </Drawer>
      ) : (
        <Modal
          title="Body Type"
          open={visible}
          onCancel={() => setVisible(false)}
          footer={null}
          className={styles.modal}
        >
          {renderContent()}
        </Modal>
      )}
    </>
  );
};

export default BodyTypeDropdown;
