"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/app/styles/Hero.module.css";

export const Hero = () => {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.hTextButtonWrapper}>
        <h1>Let&apos;s start sharing!</h1>

        <div className={styles.browseButton}>
          <Link href="/vendors">
            <button>
              browse all vendors
              <Image
                src="/icons/arrow-right-thin.svg"
                alt="Arrow Right Icon"
                width={24}
                height={24}
                draggable="false"
              />
            </button>
          </Link>
        </div>
      </div>

      <div className={styles.heroIconWrapper}>
        <Image
          src="/girl-icon.png"
          alt="girl-icon"
          width={350}
          height={600}
          draggable="false"
        ></Image>
      </div>
    </section>
  );
};

export default Hero;
