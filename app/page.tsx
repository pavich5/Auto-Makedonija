"use client"
import { RightOutlined } from "@ant-design/icons";
import styles from "./page.module.css";
import { Button, Collapse } from "antd";
import { timeToShopItems,faqItems  } from "./data";
import Link from "next/link";
import FindNextCarSection from "./components/LandingPage/FindNextCarSection";
import HelpfulResources from "./components/LandingPage/HelpfulResources";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <>
      <section>
        <div className={styles.heroSection}>
          <div className={styles.overlay}></div>
          <video
            src="https://www.carbravo.com/s3/uploads/US/Nightlight_masthead_LG_79a44444d0.mp4"
            autoPlay
            loop
            muted
            className={styles.backgroundVideo}
          />
          <img src="https://www.shutterstock.com/image-photo/blur-view-row-new-modern-600nw-1431757718.jpg" alt="" className={styles.backgroundImage} />
          <div className={styles.content}>
            <h1>Feel the usedphoria.</h1>
            <p>A better way to buy.</p>
            <p>Used vehicles are here</p>
            <Button type="primary" className={styles.shopNowButton} onClick={()=> router.push('/shopping/inventory')}>
              Shop Now
            </Button>
          </div>
        </div>
      </section>
     <FindNextCarSection/>
      <section className={styles.shopSection}>
        <div>
          <h1>Time to shop</h1>
          <div className={styles.shopItems}>
            {timeToShopItems.map((shopItem) => {
              return (
                <div className={styles.shopItem} key={shopItem.title}>
                  <img src={shopItem.image} alt="" />
                  <h3>{shopItem.title}</h3>
                  <p>{shopItem.description}</p>
                  <Link href={shopItem.link}>
                    {shopItem.linkText} &nbsp; <RightOutlined />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
     <HelpfulResources/>
      <section className={styles.faqSection}>
        <div className={styles.faqSectionWrapper}>
          <h2>Frequently Asked Questions</h2>
          <Collapse bordered={false}  defaultActiveKey={["1"]} items={faqItems}></Collapse>
        </div>
      </section>
    </>
  );
}
