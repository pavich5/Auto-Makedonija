"use client";
import React, { useState } from "react";
import { Input, Card, Row, Col, Button, Select } from "antd";
import styles from "./page.module.css";
import BodyTypeDropdown from "@/app/components/BodyTypeDropdown/BodyTypeDropdown";
import PriceFilter from "@/app/components/PriceFilter/PriceFilter";
import MakeModalFilter from "@/app/components/MakeModalFilter/MakeModalFilter";
import YearMilageFilter from "@/app/components/YearMilageFilter/YearMilageFilter";
import PerformanceFilter from "@/app/components/PerformanceFilter/PerformanceFilter";
import FeauturesFilter from "@/app/components/FeauturesFilter/FeauturesFilter";
import MoreFilters from "@/app/components/MoreFilters/MoreFilters";
import { dummyData, Filters } from "@/app/data";
import {
  DownSquareOutlined,
  EnvironmentOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import MobileFilters from "@/app/components/MobileFilters/MobileFilters";
import NoResults from "@/app/components/NoResults";
import CarQuickViewModal from "@/app/components/CarQuickViewModal/CarQuickViewModal";

const { Option } = Select;



const CarSearch: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    bodyType: [],
    price: [0, 100000],
    makeModel: {
      brands: [],
      models: [],
    },
    yearRange: [2000, 2024],
    mileageRange: [0, 100000],
    driveType: [],
    transmissionType: [],
    engineCylinders: [],
    fuelType: [],
    mpgRange: [0, 50],
    features: {
      technology: [],
      safety: [],
      premium: [],
      convenience: [],
      utility: [],
    },
    exteriorColor: [],
    interiorColor: [],
    numberOfSeats: [],
  });

  const [sortOption, setSortOption] = useState<string>("price-asc");
  const [isPriceFilterVisible, setPriceFilterVisible] =
    useState<boolean>(false);
  const [isMakeFilterVisible, setMakeFilterVisible] = useState<boolean>(false);
  const [isYearMileageFilterVisible, setYearMileageFilterVisible] =
    useState<boolean>(false);
  const [isPerformanceFilterVisible, setPerformanceFilterVisible] =
    useState<boolean>(false);
  const [isFeaturesFilterVisible, setFeaturesFilterVisible] =
    useState<boolean>(false);
  const [isMoreFiltersVisible, setMoreFiltersVisible] =
    useState<boolean>(false);
  const [isMobileFiltersVisable, setIsMobileFiltersVisable] =
    useState<boolean>(false);
  const [showQuickViewModal,setShowQuickViewModal] = useState(false)
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState({
    Price: false,
    "Make & Model": false,
    "Year & Milage": false,
    Performance: false,
    Features: false,
    "More Filters": false,
    "Body Type": false,
  });

  const filteredCars = dummyData.filter((car) => {
    const matchesBodyType =
      filters.bodyType.length === 0 || filters.bodyType.includes(car.bodyType);
    const matchesPrice =
      car.price >= filters.price[0] && car.price <= filters.price[1];
    const matchesMake =
      filters.makeModel.brands.length === 0 ||
      filters.makeModel.brands.includes(car.make);
    const matchesModel =
      filters.makeModel.models.length === 0 ||
      filters.makeModel.models.includes(car.model);
    const matchesYear =
      car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1];
    const matchesMileage =
      car.mileage >= filters.mileageRange[0] &&
      car.mileage <= filters.mileageRange[1];
    const matchesDriveType =
      filters.driveType.length === 0 ||
      filters.driveType.includes(car.driveType);
    const matchesTransmission =
      filters.transmissionType.length === 0 ||
      filters.transmissionType.includes(car.transmissionType);
    const matchesEngineCylinders =
      filters.engineCylinders.length === 0 ||
      filters.engineCylinders.includes(car.engineCylinders);
    const matchesFuelType =
      filters.fuelType.length === 0 || filters.fuelType.includes(car.fuelType);
    const matchesMpg =
      car.mpg >= filters.mpgRange[0] && car.mpg <= filters.mpgRange[1];
    const matchesFeatures = Object.keys(filters.features).every(
      (featureCategory) =>
        filters.features[featureCategory as keyof typeof filters.features]
          .length === 0 ||
        filters.features[
          featureCategory as keyof typeof filters.features
        ].every((feature) =>
          car.features[featureCategory as keyof typeof car.features].includes(
            feature
          )
        )
    );
    const matchesExteriorColor =
      filters.exteriorColor.length === 0 ||
      filters.exteriorColor.includes(car.exteriorColor);
    const matchesInteriorColor =
      filters.interiorColor.length === 0 ||
      filters.interiorColor.includes(car.interiorColor);
    const matchesNumberOfSeats =
      filters.numberOfSeats.length === 0 ||
      filters.numberOfSeats.includes(car.numberOfSeats);

    return (
      matchesBodyType &&
      matchesPrice &&
      matchesMake &&
      matchesModel &&
      matchesYear &&
      matchesMileage &&
      matchesDriveType &&
      matchesTransmission &&
      matchesEngineCylinders &&
      matchesFuelType &&
      matchesMpg &&
      matchesFeatures &&
      matchesExteriorColor &&
      matchesInteriorColor &&
      matchesNumberOfSeats
    );
  });

  const sortedCars = filteredCars.sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "date-asc":
        //@ts-ignore
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "date-desc":
        //@ts-ignore
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "mileage-asc":
        return a.mileage - b.mileage;
      case "mileage-desc":
        return b.mileage - a.mileage;
      case "year-asc":
        return a.year - b.year;
      case "year-desc":
        return b.year - a.year;
      default:
        return 0;
    }
  });

  const toggleMobileFilterVisibility = (filter: string) => {
    setMobileFiltersVisible((prevState) => ({
      ...prevState,
      //@ts-ignore
      [filter]: !prevState[filter],
    }));
  };

  const handleFilterChange = (
    value: string[] | string,
    filterType: keyof Omit<Filters, "yearRange" | "mileageRange" | "mpgRange">
  ) => {
    if (filterType === "features") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        features: value as unknown as Filters["features"],
      }));
      return
    }  
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: Array.isArray(value) ? value : [value],
      }));
    
  };

  const handlePriceChange = (value: [number, number]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: value,
    }));
  };

  const handleMakeFilterApply = (
    selectedBrands: string[],
    selectedModels: string[]
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      makeModel: {
        brands: selectedBrands,
        models: selectedModels,
      },
    }));
  };

  const handleYearMileageFilterApply = (
    yearRange: [number, number],
    mileageRange: [number, number]
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      yearRange,
      mileageRange,
    }));
    setYearMileageFilterVisible(false);
  };

  const handlePerformanceFilterApply = (filters: {
    driveType: string[];
    transmissionType: string[];
    engineCylinders: number[];
    fuelType: string[];
    mpgRange: [number, number];
  }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...filters,
    }));
    setPerformanceFilterVisible(false);
  };

  const handleFeaturesFilterApply = (features: Filters["features"]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      features,
    }));
    setFeaturesFilterVisible(false);
  };

  const handleMoreFiltersApply = (filters: {
    exteriorColor: string[];
    interiorColor: string[];
    numberOfSeats: number[];
  }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...filters,
    }));
    setMoreFiltersVisible(false);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const suffix = (
    <div className={styles.suffixItems}>
      <BodyTypeDropdown
        onSelect={(value) => handleFilterChange(value, "bodyType")}
        isMobile={mobileFiltersVisible["Body Type"]}
        toggleMobileFilterVisibility={toggleMobileFilterVisibility}
      />
      <Button
        style={{ border: "none" }}
        onClick={() => setPriceFilterVisible(true)}
      >
        Price <DownSquareOutlined />
      </Button>
      <Button
        style={{ border: "none" }}
        onClick={() => setMakeFilterVisible(true)}
      >
        Make & Model <DownSquareOutlined />
      </Button>
      <Button
        style={{ border: "none" }}
        onClick={() => setYearMileageFilterVisible(true)}
      >
        Year & Mileage <DownSquareOutlined />
      </Button>
      <Button
        style={{ border: "none" }}
        onClick={() => setPerformanceFilterVisible(true)}
      >
        Performance <DownSquareOutlined />
      </Button>
      <Button
        style={{ border: "none" }}
        onClick={() => setFeaturesFilterVisible(true)}
      >
        Features <DownSquareOutlined />
      </Button>
      <Button
        style={{ border: "none" }}
        onClick={() => setMoreFiltersVisible(true)}
      >
        More Filters <DownSquareOutlined />
      </Button>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <Input
          placeholder="Search"
          className={styles.searchInput}
          suffix={suffix}
          prefix={<SearchOutlined />}
        />
        <div className={styles.filters}>
          <PriceFilter
            min={0}
            max={100000}
            onPriceChange={handlePriceChange}
            isVisible={isPriceFilterVisible}
            onClose={() => setPriceFilterVisible(false)}
            isMobile={mobileFiltersVisible.Price}
            toggleMobileFilterVisibility={toggleMobileFilterVisibility}
          />
          <MakeModalFilter
            isVisible={isMakeFilterVisible}
            onClose={() => setMakeFilterVisible(false)}
            onApply={handleMakeFilterApply}
            isMobile={mobileFiltersVisible["Make & Model"]}
            toggleMobileFilterVisibility={toggleMobileFilterVisibility}
          />
          <YearMilageFilter
            isVisible={isYearMileageFilterVisible}
            onClose={() => setYearMileageFilterVisible(false)}
            onApply={handleYearMileageFilterApply}
            isMobile={mobileFiltersVisible["Year & Milage"]}
            toggleMobileFilterVisibility={toggleMobileFilterVisibility}
          />
          <PerformanceFilter
            isVisible={isPerformanceFilterVisible}
            onClose={() => setPerformanceFilterVisible(false)}
            onApply={handlePerformanceFilterApply}
            isMobile={mobileFiltersVisible.Performance}
            toggleMobileFilterVisibility={toggleMobileFilterVisibility}
          />
          <FeauturesFilter
            isVisible={isFeaturesFilterVisible}
            onClose={() => setFeaturesFilterVisible(false)}
            onApply={handleFeaturesFilterApply}
            isMobile={mobileFiltersVisible.Features}
            toggleMobileFilterVisibility={toggleMobileFilterVisibility}
          />
          <MoreFilters
            isVisible={isMoreFiltersVisible}
            onClose={() => setMoreFiltersVisible(false)}
            onApply={handleMoreFiltersApply}
            isMobile={mobileFiltersVisible["More Filters"]}
            toggleMobileFilterVisibility={toggleMobileFilterVisibility}
          />
        </div>
      </div>
      <div className={styles.headerContainer}>
        <div className={styles.infoSection}>
          <p className={styles.infoTitle}>Used Cars for Sale</p>
          <p className={styles.infoCount}>{sortedCars.length} vehicle(s)</p>
        </div>
        <div className={styles.controlsSection}>
          <div className={styles.sortingDropdown}>
            <Select
              defaultValue="Sort by"
              style={{ width: 200 }}
              onChange={handleSortChange}
            >
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
          <div className={styles.locationFilter}>
            <Select
              suffixIcon={<EnvironmentOutlined />}
              defaultValue="Filter by Location"
              style={{ width: 150 }}
            >
              <Option value="any">Any Location</Option>
              <Option value="city1">City 1</Option>
              <Option value="city2">City 2</Option>
            </Select>
          </div>
        </div>
      </div>
      {sortedCars.length === 0 ? (
        <div className={styles.noResults}>
          <NoResults />
        </div>
      ) : (
        <Row gutter={[16, 16]} className={styles.carList}>
          {sortedCars.map((car) => (
            <Col key={car.id} xs={24} sm={12} md={8} lg={6}>
              <Card hoverable className={styles.carCard}>
                <Card.Meta
                  title={
                    <>
                      <h3>{car.title}</h3>
                      <p className={styles.mileage}>
                        {car.mileage.toLocaleString()} miles · VIN: {car.vin}
                      </p>
                      <p>
                        <EnvironmentOutlined /> &nbsp; {car.dealer} (
                        {car.distance})
                      </p>
                    </>
                  }
                  description={
                    <>
                      <img
                        alt={car.title}
                        src={car.image}
                        className={styles.carImage}
                      />
                      <div className={styles.priceSection}>
                        <p className={styles.dealerPrice}>Dealer Price</p>
                        <p className={styles.price}>
                          ${car.price.toLocaleString()}
                        </p>
                      </div>
                      <Button className={styles.viewOrBuyButtonMobile}>
                        View & Buy
                      </Button>
                      <div className={styles.buttonSection}>
                        <Button className={styles.quickViewButton} onClick={()=> setShowQuickViewModal(true)}>
                          Quick View
                        </Button>
                        <CarQuickViewModal car={car} isVisible={showQuickViewModal} onClose={()=> setShowQuickViewModal(false)}/>
                        <Button
                          className={styles.viewOrBuyButton}
                          type="primary"
                        >
                          View & Buy
                        </Button>
                      </div>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Button
        className={styles.sortAndFilterMobile}
        onClick={() => {
          setIsMobileFiltersVisable(true);
        }}
        type="default"
        icon={<FilterOutlined />}
      >
        Sort & Filter
      </Button>
      <MobileFilters
        sortValue={sortOption}
        handleSortChange={handleSortChange}
        toggleMobileFilterVisibility={toggleMobileFilterVisibility}
        isDrawerVisible={isMobileFiltersVisable}
        setDrawerVisible={setIsMobileFiltersVisable}
      />
    </div>
  );
};

export default CarSearch;
