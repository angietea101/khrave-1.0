"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/Navbar.module.css";
import Image from "next/image";
import { signOut } from "next-auth/react";

const Navbar = ({ session }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleRedirect = () => {
    router.push("/admin");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/login`,
    });
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Link href={"/"}>
          <h1 className={styles.navbarTitle}>khrave</h1>
        </Link>
        <div className={styles.navIcons}>
          {session?.user ? (
            <button onClick={handleRedirect}>
              <Image
                src="/icons/user.svg"
                alt="User Profile Icon"
                width={40}
                height={40}
              />
            </button>
          ) : (
            <Link href="/login" className={styles.navbarLoginButton}>
              Log in
            </Link>
          )}
          <button
            onClick={toggleMenu}
            className={`${styles.hamb} ${isOpen ? styles.active : ""}`}
            aria-label="Open Menu"
          >
            <span className={styles.srOnly}>Open Menu</span>
            <svg className={styles.ham} viewBox="0 0 100 100">
              <path
                className={styles.lineTop}
                d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
              />
              <path className={styles.lineMiddle} d="m 30,50 h 40" />
              <path
                className={styles.lineBottom}
                d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
              />
            </svg>
          </button>
        </div>
      </nav>
      <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <div className={styles.topWrapper}>
          <button>All posts</button>
          <button>Most Popular Restaurants</button>
          <button>Surprise Me!</button>
          <button>About the team</button>
          {session?.user && <button onClick={handleLogOut}>Log out</button>}
        </div>
        <div className={styles.bottomWrapper}>
          <button>Contact Us:</button>
          <div className={styles.contactButtonWrapper}>
            <button>
              <Image
                src="/icons/mail.svg"
                alt="Mail Icon"
                width={24}
                height={24}
                draggable="false"
              />
            </button>
            <button>
              <Image
                src="/icons/bird.svg"
                alt="Bird Icon"
                width={24}
                height={24}
                draggable="false"
              />
            </button>
            <button></button>
            <button></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
