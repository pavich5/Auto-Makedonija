import React from 'react';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined, PinterestOutlined, TikTokOutlined } from '@ant-design/icons';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.section}>
                <h4>Find or Sell a Car</h4>
                <ul>
                    <li><a href="#">Search Cars</a></li>
                    <li><a href="#">Sell Your Car</a></li>
                </ul>
            </div>
            <div className={styles.section}>
                <h4>Certified Used Vehicles</h4>
                <ul>
                    <li><a href="#">Cars</a></li>
                    <li><a href="#">Trucks</a></li>
                    <li><a href="#">SUVs</a></li>
                    <li><a href="#">EVs & Hybrids</a></li>
                    <li><a href="#">Vans</a></li>
                </ul>
            </div>
            <div className={styles.section}>
                <h4>Support</h4>
                <ul>
                    <li><a href="#">Dealer Locator</a></li>
                    <li><a href="#">Help</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Sign Up for Updates</a></li>
                </ul>
            </div>
            <div className={styles.social}>
                <h4>Follow Company Name</h4>
                <div className={styles.icons}>
                    <a href="#"><FacebookOutlined /></a>
                    <a href="#"><InstagramOutlined /></a>
                    <a href="#"><TwitterOutlined /></a>
                    <a href="#"><YoutubeOutlined /></a>
                    <a href="#"><PinterestOutlined /></a>
                    <a href="#"><TikTokOutlined /></a>
                </div>
            </div>
            <div className={styles.legal}>
                <ul>
                    <li><a href="#">Privacy Statement</a></li>
                    <li><a href="#">Legal</a></li>
                    <li><a href="#">Ad Choices</a></li>
                    <li><a href="#">Your Privacy Choices & Opt-Out Rights</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
