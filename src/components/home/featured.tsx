'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from '@/components/ui/ArrowRight';

const Features = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const featuredFoodSpots = [
        { href: "vendors/subway", src: "/subway.png", alt: "Subway", width: 200, height: 200 },
        { href: "vendors/chipotle", src: "/chipotle1.png", alt: "Chipotle logo", width: 100, height: 100 },
        { href: "vendors/dominos", src: "/dominos.png", alt: "Domino's Pizza logo", width: 100, height: 100 },
        { href: "vendors/dunkin", src: "/dunkin.png", alt: "Dunkin' Donuts logo", width: 100, height: 100 },
        { href: "vendors/frostbites", src: "/frostbites.png", alt: "Frostbites logo", width: 100, height: 100 },
        { href: "vendors/cava", src: "/cava.png", alt: "Cava logo", width: 100, height: 100 }
    ];

    return (
        <div className="home-body-container">
            <div className={'section-title-wrapper'}>
                <p>featured food spots</p>
                <Link href={"vendors"} className="browse-wrapper">
                    <span>browse all</span>
                    <ArrowRight />
                </Link>
            </div>

            <div className="featured-picture-gallery">
                {featuredFoodSpots.slice(0, windowWidth < 740 ? 3 : windowWidth < 1200 ? 5 : featuredFoodSpots.length).map((spot, index) => (
                    <Link key={index} href={spot.href} className="featured-container">
                        <div className="featured-image">
                            <Image src={spot.src} alt={spot.alt} height={spot.height} width={spot.width} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Features;
