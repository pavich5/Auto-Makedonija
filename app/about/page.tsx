import React from 'react';
import styles from './page.module.css';

const AboutUs = () => {
  return (
    <div className={styles.designRoot}>
      <div className={styles.layoutContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.layoutContentContainer}>
            <div className={styles.container}>
              <div className={styles.imageWrapper}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url("https://www.nasdaq.com/sites/acquia.prod/files/gobankingrates/young-woman-browses-cars-auto-dealership_iStock-1354041251.jpg")`,
                  }}
                ></div>
              </div>
            </div>
            <h1 className={styles.title}>About Us</h1>
            <p className={styles.description}>
              At CarSell, we believe buying a car should be simple. That's why we've built a platform that lets you buy or sell a car in just a few clicks. Our mission is to make car buying and selling as easy as possible. We want to make it easy for you to find the perfect car for your needs. Our platform is designed to be easy to use, so you can find the perfect car for your needs. We're here to help you every step of the way. We're here to help you find the perfect car for your needs.
            </p>
            <h2 className={styles.subtitle}>Why Choose Us?</h2>
            <div className={styles.gridContainer}>
              <div className={styles.gridItem}>
                <div className={styles.iconWrapper}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M208,40H48A16,16,0,0,0,32,56v58.78c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm0,74.79c0,78.42-66.35,104.62-80,109.18-13.53-4.51-80-30.69-80-109.18V56H208ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.68l50.34-50.34a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z"></path>
                  </svg>
                </div>
                <h2 className={styles.gridItemTitle}>Buy with confidence</h2>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.iconWrapper}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M247.42,117l-14-35A15.93,15.93,0,0,0,218.58,72H184V64a8,8,0,0,0-8-8H24A16,16,0,0,0,8,72V184a16,16,0,0,0,16,16H41a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,247.42,117ZM184,88h34.58l9.6,24H184ZM24,72H168v64H24ZM72,208a16,16,0,1,1,16-16A16,16,0,0,1,72,208Zm81-24H103a32,32,0,0,0-62,0H24V152H168v12.31A32.11,32.11,0,0,0,153,184Zm31,24a16,16,0,1,1,16-16A16,16,0,0,1,184,208Zm48-24H215a32.06,32.06,0,0,0-31-24V128h48Z"></path>
                  </svg>
                </div>
                <h2 className={styles.gridItemTitle}>Find your perfect car</h2>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.iconWrapper}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>
                  </svg>
                </div>
                <h2 className={styles.gridItemTitle}>Get a great price</h2>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.iconWrapper}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path>
                  </svg>
                </div>
                <h2 className={styles.gridItemTitle}>Shop when it works for you</h2>
              </div>
            </div>
            <h2 className={styles.subtitle}>How It Works</h2>
            <div className={styles.stepsContainer}>
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>1</div>
                <h3 className={styles.stepTitle}>Create an Account</h3>
                <p className={styles.stepDescription}>
                  Sign up for a free account and get started by browsing our inventory or listing your car for sale.
                </p>
              </div>
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>2</div>
                <h3 className={styles.stepTitle}>Browse Cars</h3>
                <p className={styles.stepDescription}>
                  Browse our extensive inventory of used cars, or use our search and filter options to find the perfect car for you.
                </p>
              </div>
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>3</div>
                <h3 className={styles.stepTitle}>Buy or Sell</h3>
                <p className={styles.stepDescription}>
                  Whether you're buying or selling, our platform makes it easy. Connect with sellers or buyers directly and complete your transaction with ease.
                </p>
              </div>
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>4</div>
                <h3 className={styles.stepTitle}>Drive Away Happy</h3>
                <p className={styles.stepDescription}>
                  Once your transaction is complete, you're ready to hit the road in your new car. Enjoy the ride!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
