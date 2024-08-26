"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeartOutlined, MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
import { logo_url } from "@/app/data";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = {
    name: "John Doe",
    image:
      "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
  };
  const router = useRouter();
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo} onClick={()=> {
          router.push('/')
        }}>
          <img alt="e" src={logo_url} />
          <p>Company Name</p>
        </div>
        <nav className={styles.nav}>
          <Link href="/shopping/inventory" className={styles.link}>
            Search Cars
          </Link>
          <Link href="/browse" className={styles.link}>
            Sell Your Car
          </Link>
          <Link href="/about" className={styles.link}>
            About Us
          </Link>
          <Link href="/contact" className={styles.link}>
            Ownership
          </Link>
        </nav>
        <div className={styles.rightSection}>
          <div className={styles.account}>
            <HeartOutlined className={styles.icon} />
            <span className={styles.accountText}>My Account</span>
          </div>
          <div className={styles.hamburger} onClick={showDrawer}>
            <MenuOutlined className={styles.icon} />
          </div>
        </div>
      </header>

      <Drawer
        title={
          <div className={styles.logo}>
          <img alt="e" src={logo_url} />
          <p>Company Name</p>
        </div>
        }
        placement="right"
        onClose={onClose}
        visible={visible}
        closable
      >
        {isLoggedIn ? (
          <div className={styles.userInfo}>
            <Image
              src={user?.image}
              alt="User Image"
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
            />
            <span className={styles.userName}>{user.name}</span>
          </div>
        ) : (
          <div className={styles.userInfo}>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/8801/8801434.png"
              alt="User Image"
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
            />
            <div className={styles.createUser}>
              <span onClick={() => setVisible(false)} className={styles.userName}>Sign In</span>
              <Link className={styles.userNameAccount} href="/" onClick={() => setVisible(false)}>
                Create an account
              </Link>
            </div>
          </div>
        )}
        <nav className={styles.drawerNav}>
          <Link onClick={() => setVisible(false)} href="/shopping/inventory" className={styles.drawerLink}>
            Search Cars
          </Link>
          <Link onClick={() => setVisible(false)} href="/browse" className={styles.drawerLink}>
            Sell Your Car
          </Link>
          <Link onClick={() => setVisible(false)} href="/about" className={styles.drawerLink}>
            About Us
          </Link>
          <Link onClick={() => setVisible(false)} href="/contact" className={styles.drawerLink}>
            Ownership
          </Link>
        </nav>
      </Drawer>
    </>
  );
};

export default Header;
