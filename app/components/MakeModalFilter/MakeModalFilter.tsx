"use client";
import React, { useState } from "react";
import { Modal, Input, List, Button, Checkbox, Row, Col, Drawer } from "antd";
import styles from "./MakeModalFilter.module.css";
import { RightCircleOutlined } from "@ant-design/icons";

const carBrandsWithModels: Record<string, string[]> = {
  Toyota: ["Camry", "Corolla", "Highlander", "RAV4", "Tacoma"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot", "Fit"],
  Ford: ["F-150", "Escape", "Mustang", "Explorer", "Fusion"],
  Chevrolet: ["Malibu", "Equinox", "Camaro", "Silverado", "Traverse"],
  Nissan: ["Altima", "Rogue", "370Z", "Sentra", "Murano"],
  Hyundai: ["Elantra", "Sonata", "Santa Fe", "Tucson", "Kona"],
  Kia: ["Soul", "Optima", "Sorento", "Sportage", "Forte"],
  BMW: ["3 Series", "X5", "Z4", "5 Series", "X3"],
  Mercedes: ["C-Class", "E-Class", "GLA", "S-Class", "GLC"],
  Audi: ["A3", "A4", "Q5", "A6", "Q7"],
};

interface MakeModalFilterProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (selectedBrands: string[], selectedModels: string[]) => void;
  isMobile: boolean;
  toggleMobileFilterVisibility:(filter:string) => void
}

const MakeModalFilter: React.FC<MakeModalFilterProps> = ({
  isVisible,
  onClose,
  onApply,
  isMobile,
  toggleMobileFilterVisibility
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [selectedModels, setSelectedModels] = useState<Set<string>>(new Set());
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSelectBrand = (brand: string) => {
    setSelectedBrand(brand === selectedBrand ? null : brand);
    setSelectedBrands((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(brand)) {
        newSelection.delete(brand);
      } else {
        newSelection.add(brand);
      }
      return newSelection;
    });
  };

  const handleSelectModel = (model: string) => {
    setSelectedModels((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(model)) {
        newSelection.delete(model);
      } else {
        newSelection.add(model);
      }
      return newSelection;
    });
  };

  const handleApply = () => {
    onApply(Array.from(selectedBrands), Array.from(selectedModels));
    onClose();
    if(isMobile){
      toggleMobileFilterVisibility("Make & Model")
    }
  };

  const filteredBrands = Object.keys(carBrandsWithModels).filter((brand) =>
    brand.toLowerCase().includes(searchText.toLowerCase())
  );

  const getSelectedModelCount = (brand: string) => {
    const models = carBrandsWithModels[brand];
    return models.filter((model) => selectedModels.has(model)).length;
  };

  const renderContent = () => (
    <Row className={styles.container}>
      <Col span={selectedBrand ? 12 : 24} className={styles.brandsColumn}>
        <Input
          placeholder="Search car brands"
          value={searchText}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <List
          bordered
          dataSource={filteredBrands}
          renderItem={(item: string) => (
            <List.Item
              className={styles.brandItem}
              onClick={() => handleSelectBrand(item)}
              style={{ cursor: "pointer", display: "flex" }}
            >
              {item}
              <span className={selectedBrand ? styles.count : undefined}>
                {selectedBrand ? getSelectedModelCount(item) : <RightCircleOutlined />}
              </span>
            </List.Item>
          )}
        />
      </Col>
      {selectedBrand && (
        <Col span={12} className={styles.modelsColumn}>
          <h4>Models for {selectedBrand}</h4>
          <Button
            onClick={() => {
              const allModels = carBrandsWithModels[selectedBrand];
              setSelectedModels(new Set(allModels));
            }}
            className={styles.selectAllButton}
          >
            Select All
          </Button>
          {carBrandsWithModels[selectedBrand]?.map((model: string) => (
            <Checkbox
              key={model}
              checked={selectedModels.has(model)}
              onChange={() => handleSelectModel(model)}
              className={styles.checkbox}
            >
              {model}
            </Checkbox>
          ))}
        </Col>
      )}
    </Row>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          title="Select Make & Model"
          placement="bottom"
          closable={true}
          onClose={() => toggleMobileFilterVisibility("Make & Model")}
          open={isMobile}
          height="95%"
          footer={
            <div style={{ textAlign: 'right' }}>
              <Button onClick={() => toggleMobileFilterVisibility("Make & Model")} className={styles.footerButton} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" onClick={handleApply} className={styles.footerButton}>
                Apply
              </Button>
            </div>
          }
        >
          {renderContent()}
        </Drawer>
      ) : (
        <Modal
          title="Select Make & Model"
          open={isVisible}
          onCancel={onClose}
          footer={[
            <Button key="cancel" onClick={onClose} className={styles.footerButton}>
              Cancel
            </Button>,
            <Button
              key="apply"
              type="primary"
              onClick={handleApply}
              className={styles.footerButton}
            >
              Apply
            </Button>,
          ]}
          className={styles.modal}
          width={selectedBrand ? '60vw' : '30vw'}
          bodyStyle={{ height: "55vh" }}
        >
          {renderContent()}
        </Modal>
      )}
    </>
  );
};

export default MakeModalFilter;
