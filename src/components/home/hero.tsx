"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react"; 

export const Hero = () => {
    return (
        <section className="hero-container">
            <div className="htext-button-wrapper">
                <div className="hero-text">
                    <h1>LET'S START SHARING!</h1>
                </div>

                <div className="create-post-button">
                    <Link href='/vendors'>
                        <button className="">
                            create post
                        </button>
                    </Link>
                </div>
            </div>

            <div className="">
                <Image src='/girl-icon.png' alt='girl-icon' width={350} height={600}></Image>    
            </div>
        </section> 
    );
}

export default Hero;
