"use client";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const loginState = localStorage.getItem('isLoggedIn');
    if (loginState === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div
          className={styles.logo}
          onClick={() => {
            router.push("/");
          }}
        >
          <img alt="e" src={logo_url} />
          <p>Auto Makedonija</p>
        </div>
        <nav className={styles.nav}>
          <Link href="/shopping/inventory" className={styles.link}>
            Search Cars
          </Link>
          <Link href="/sell" className={styles.link}>
            Sell Your Car
          </Link>
          <Link href="/about" className={styles.link}>
            About Us
          </Link>
        </nav>
        <div className={styles.rightSection}>
          <div className={styles.account}>
            <HeartOutlined className={styles.icon} />
            <span
              className={styles.accountText}
              onClick={() => {
                if (!isLoggedIn) {
                  router.push("/login");
                }
              }}
            >
              My Account
            </span>
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
            <p>Auto Makedonija</p>
          </div>
        }
        placement="right"
        onClose={onClose}
        open={visible}
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
          <div
            className={styles.userInfo}
            onClick={() => {
              setVisible(false);
              router.push("/login");
            }}
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/512/8801/8801434.png"
              alt="User Image"
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
            />
            <div className={styles.createUser}>
              <span className={styles.userName}>Sign In</span>
              <Link className={styles.userNameAccount} href="/">
                Create an account
              </Link>
            </div>
          </div>
        )}
        <nav className={styles.drawerNav}>
          <Link
            onClick={() => setVisible(false)}
            href="/shopping/inventory"
            className={styles.drawerLink}
          >
            Search Cars
          </Link>
          <Link
            onClick={() => setVisible(false)}
            href="/sell"
            className={styles.drawerLink}
          >
            Sell Your Car
          </Link>
          <Link
            onClick={() => setVisible(false)}
            href="/about"
            className={styles.drawerLink}
          >
            About Us
          </Link>
        </nav>
      </Drawer>
    </>
  );
};

export default Header;
