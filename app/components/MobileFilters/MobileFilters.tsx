import React from "react";
import { Drawer, Button, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./MobileFilters.module.css";

const { Option } = Select;

interface MobileFiltersProps {
  isDrawerVisible: boolean;
  setDrawerVisible: (visible: boolean) => void;
  toggleMobileFilterVisibility: (filter: string) => void;
  handleSortChange: (value: string) => void;
  sortValue: string; 
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  isDrawerVisible,
  setDrawerVisible,
  toggleMobileFilterVisibility,
  handleSortChange,
  sortValue,
}) => {
  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <div>
      <Drawer
        title={null}
        placement="bottom"
        closable={false}
        onClose={onCloseDrawer}
        open={isDrawerVisible}
        height="80%"
        bodyStyle={{ padding: 0 }}
      >
        <div className={styles.drawerContent}>
          <div className={styles.header}>
            <span className={styles.sortTitle}>Sort by :</span>
            <Select
              value={sortValue}
              style={{ width: 200 }}
              onChange={handleSortChange} 
              className={styles.sortSelect}
            >
              <Option value="relevancy">Relevancy</Option>
              <Option value="price-asc">Price: Low to High</Option>
              <Option value="price-desc">Price: High to Low</Option>
              <Option value="date-asc">Date: Newest First</Option>
              <Option value="date-desc">Date: Oldest First</Option>
              <Option value="mileage-asc">Mileage: Low to High</Option>
              <Option value="mileage-desc">Mileage: High to Low</Option>
              <Option value="year-asc">Year: Old to New</Option>
              <Option value="year-desc">Year: New to Old</Option>
            </Select>
          </div>

          <div className={styles.filterList}>
            {[
              "Body Type",
              "Price",
              "Make & Model",
              "Year & Milage",
              "Performance",
              "Features",
              "More Filters",
            ].map((filter) => (
              <div
                key={filter}
                className={styles.filterItem}
                onClick={() => toggleMobileFilterVisibility(filter)}
              >
                {filter} <DownOutlined />
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <div className={styles.buttons}>
              <Button onClick={onCloseDrawer} className={styles.closeButton}>
                Close
              </Button>
              <Button
                onClick={onCloseDrawer}
                type="primary"
                className={styles.applyButton}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MobileFilters;
