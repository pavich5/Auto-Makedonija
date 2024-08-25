import { vehiclesTypes, filterTypes } from '@/app/data';
import { SearchOutlined, RightOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import Link from 'next/link';
import styles from '../../page.module.css'

const FindNextCarSection = () => {
  return (
    <section className={styles.buyCarSection}>
        <div className={styles.searchSection}>
          <h2>Find your next used car</h2>
          <h3>
            With thousands of certified used vehicles to choose <br /> from,
            it’s easy to discover your perfect match.
          </h3>
          <Input
            placeholder="Search by make, model, keyword"
            enterButton
            className={styles.searchInput}
            suffix={
              <Button type="primary">
                <SearchOutlined />
              </Button>
            }
          />
          <div className={styles.typeOfCarsWrapper}>
            {vehiclesTypes.map((vehiclesType) => {
              return (
                <div className={styles.carType}>
                  <img src={vehiclesType.image} />
                  <Link href={vehiclesType.link}>
                    {vehiclesType.title} &nbsp; <RightOutlined />
                  </Link>
                </div>
              );
            })}
          </div>
          <div className={styles.typeOfFiltersWrapper}>
            {filterTypes.map((filterType) => {
              return (
                <div className={styles.filterType}>
                  <img src={filterType.image} />
                  <Link href={filterType.link}>
                    {filterType.title} &nbsp; <RightOutlined />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
  )
}

export default FindNextCarSection