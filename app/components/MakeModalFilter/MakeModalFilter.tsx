"use client";
import React, { useState } from "react";
import { Modal, Input, List, Button, Checkbox, Row, Col, Drawer } from "antd";
import styles from "./MakeModalFilter.module.css";
import { RightCircleOutlined } from "@ant-design/icons";

const carBrandsWithModels: Record<string, string[]> = {
  Acura: ["ILX", "MDX", "RDX", "TLX", "NSX"],
  AlfaRomeo: ["Giulia", "Stelvio", "4C", "Tonale"],
  AstonMartin: ["DB11", "Vantage", "DBX"],
  Audi: ["A3", "A4", "A6", "A8", "Q3", "Q5", "Q7", "Q8", "e-tron"],
  Bentley: ["Bentayga", "Continental", "Flying Spur"],
  BMW: ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "X1", "X3", "X5", "i3", "i8"],
  Buick: ["Encore", "Enclave", "Envision", "Regal"],
  Cadillac: ["CT4", "CT5", "Escalade", "XT4", "XT5", "XT6"],
  Chevrolet: ["Blazer", "Camaro", "Colorado", "Corvette", "Equinox", "Malibu", "Silverado", "Suburban", "Tahoe"],
  Chrysler: ["300", "Pacifica", "Voyager"],
  Dodge: ["Charger", "Challenger", "Durango", "Journey"],
  Ferrari: ["488", "812", "Roma", "Portofino", "SF90"],
  Fiat: ["500", "500X", "500L"],
  Ford: ["F-150", "Mustang", "Explorer", "Escape", "Edge", "Expedition", "Fusion"],
  Genesis: ["G70", "G80", "G90", "GV80"],
  GMC: ["Acadia", "Canyon", "Sierra", "Terrain", "Yukon"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot", "Fit", "Odyssey", "Ridgeline"],
  Hyundai: ["Elantra", "Santa Fe", "Sonata", "Tucson", "Kona", "Palisade"],
  Infiniti: ["Q50", "Q60", "QX50", "QX60", "QX80"],
  Jaguar: ["E-Pace", "F-Pace", "I-Pace", "XF", "XE", "F-Type"],
  Jeep: ["Cherokee", "Grand Cherokee", "Wrangler", "Compass", "Renegade", "Gladiator"],
  Kia: ["Forte", "Sorento", "Soul", "Sportage", "Telluride", "Optima", "Stinger"],
  Lamborghini: ["Aventador", "Huracan", "Urus"],
  LandRover: ["Defender", "Discovery", "Range Rover", "Evoque", "Velar"],
  Lexus: ["ES", "GS", "GX", "IS", "LX", "NX", "RC", "RX", "UX"],
  Lincoln: ["Aviator", "Corsair", "Nautilus", "Navigator"],
  Maserati: ["Ghibli", "Levante", "Quattroporte"],
  Mazda: ["Mazda3", "CX-3", "CX-5", "CX-9", "MX-5", "Mazda6"],
  McLaren: ["GT", "720S", "600LT", "Artura"],
  MercedesBenz: ["A-Class", "C-Class", "E-Class", "G-Class", "GLE", "GLS", "S-Class", "AMG GT", "CLA", "GLA"],
  Mini: ["Cooper", "Countryman", "Clubman", "John Cooper Works"],
  Mitsubishi: ["Eclipse Cross", "Outlander", "Mirage", "Pajero", "Lancer"],
  Nissan: ["Altima", "Maxima", "Sentra", "Versa", "Rogue", "Murano", "Pathfinder", "Frontier", "Titan", "370Z"],
  Porsche: ["911", "Cayenne", "Macan", "Panamera", "Taycan"],
  Ram: ["1500", "2500", "3500", "ProMaster"],
  RollsRoyce: ["Phantom", "Ghost", "Wraith", "Dawn", "Cullinan"],
  Subaru: ["Impreza", "Legacy", "Outback", "Forester", "Crosstrek", "Ascent", "WRX"],
  Tesla: ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck"],
  Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma", "Tundra", "Prius", "Avalon", "4Runner"],
  Volkswagen: ["Jetta", "Passat", "Tiguan", "Atlas", "Golf", "Beetle", "ID.4"],
  Volvo: ["S60", "S90", "XC40", "XC60", "XC90", "V60", "V90"]
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
          className={styles.list} // Apply scrolling style
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
          <div className={styles.list}> {/* Apply scrolling style */}
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
          </div>
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
