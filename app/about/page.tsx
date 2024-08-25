"use client"
import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import styles from './page.module.css';

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    textMessage: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { name, email, textMessage } = formData;
    if (!name || !email || !textMessage) {
      message.error('Please fill out all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      message.error('Please input a valid email.');
      return;
    }

    console.log('Form Data:', formData);
    message.success('Your message has been sent successfully!');
    setFormData({ name: '', email: '', textMessage: '' }); 
  };

  return (
    <div className={styles.aboutUsContainer}>
      <header className={styles.header}>
        <h1>About Us</h1>
        <p>Discover the story behind Company Name and meet the team dedicated to transforming your car buying and selling experience.</p>
      </header>
      
      <section className={styles.history}>
        <h2>Our Journey</h2>
        <div className={styles.historyContent}>
          <img src="https://www.dealernewstoday.com/wp-content/uploads/2019/09/Sales-Team.jpg" alt="Company History" className={styles.historyImage} />
          <div className={styles.historyText}>
            <p>
              Founded in [Year], Company Name has been at the forefront of the automotive marketplace. Our innovative platform connects buyers and sellers with ease and efficiency. We are driven by a passion for cars and a commitment to providing a seamless transaction experience.
            </p>
            <p>
              Our platform has evolved over the years, incorporating the latest technologies and feedback from our valued customers. Today, we are proud to be a leader in the industry, known for our reliability, customer service, and cutting-edge features.
            </p>
          </div>
        </div>
      </section>
      
      <section className={styles.team}>
        <h2>Meet Our Team</h2>
        <div className={styles.teamMembers}>
          <div className={styles.teamMember}>
            <img src="https://www.freep.com/gcdn/-mm-/11c815214a457b609b81c83d9e1db6e560b9c7b9/c=0-29-2397-1383/local/-/media/2018/02/16/DetroitFreeP/DetroitFreePress/636543954496005768-ruck-salesman-CP.jpg?width=660&height=371&fit=crop&format=pjpg&auto=webp" alt="John Doe" className={styles.teamImage} />
            <div className={styles.teamInfo}>
              <h3>John Doe</h3>
              <p>CEO & Founder</p>
              <p>John brings over 20 years of automotive expertise to Company Name. His visionary leadership and passion for innovation drive our mission to enhance the car buying and selling experience.</p>
            </div>
          </div>
          <div className={styles.teamMember}>
            <img src="https://www.freep.com/gcdn/-mm-/11c815214a457b609b81c83d9e1db6e560b9c7b9/c=0-29-2397-1383/local/-/media/2018/02/16/DetroitFreeP/DetroitFreePress/636543954496005768-ruck-salesman-CP.jpg?width=660&height=371&fit=crop&format=pjpg&auto=webp" alt="John Doe" className={styles.teamImage} />
            <div className={styles.teamInfo}>
              <h3>John Doe</h3>
              <p>CEO & Founder</p>
              <p>John brings over 20 years of automotive expertise to Company Name. His visionary leadership and passion for innovation drive our mission to enhance the car buying and selling experience.</p>
            </div>
          </div>
          <div className={styles.teamMember}>
            <img src="https://media.istockphoto.com/id/1367978957/photo/cropped-portrait-of-a-handsome-young-male-car-salesman-working-on-the-showroom-floor.jpg?s=612x612&w=0&k=20&c=3S8e7-2OokssOGRURcKSM8F2aBa2CH-F3y4s7PPshCg=" alt="Jane Smith" className={styles.teamImage} />
            <div className={styles.teamInfo}>
              <h3>Jane Smith</h3>
              <p>Head of Customer Service</p>
              <p>Jane is dedicated to ensuring that every customer interaction is positive. Her leadership in customer service ensures that our users receive top-notch support and assistance.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.contact}>
        <h2>Contact Us</h2>
        <div className={styles.contactForm}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <Input.TextArea
                id="message"
                name="message"
                rows={4}
                value={formData.textMessage}
                onChange={handleChange}
                placeholder="Your Message"
              />
            </div>
            <Button type="primary" htmlType="submit" className={styles.submitButton}>
              Send
            </Button>
          </form>
        </div>
      </section>
      
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
