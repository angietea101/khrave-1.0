import React from "react";
import Image from "next/image";
import Link from "next/link";

const ArrowIcon = () => (
    <svg
        width="30"
        height="30"
        viewBox="0 0 48 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-1"
    >
        <path
            d="M10 21H38M38 21L24 8.75M38 21L24 33.25"
            stroke="#1E1E1E"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const Features = () => {
    return(
        <div className="featured-container">
            <div className={'featured-title-wrapper'}>
                <p className="featured-title">featured food spots</p>
                <Link href={"vendors"} className="browse-wrapper">
                    <p className="browse-text">browse all</p>
                    <ArrowIcon />
                </Link>
            </div>

            <div className="pl-16 pr-16 grid grid-cols-6 gap-4">
                <Link href="vendors/subway" className="featured-image">
                    <Image src="/subway.png" alt="Subway" height={200} width={200} />
                </Link>

                <Link href="vendors/chipotle" className="featured-image">
                    <Image src="/chipotle1.png" alt="Chipotle logo" height={100} width={100} />
                </Link>

                <Link href="vendors/dominos" className="featured-image">
                    <Image src="/dominos.png" alt="Domino's Pizza logo" height={100} width={100} />
                </Link>

                <Link href="vendors/dunkin" className="featured-image">
                    <Image src="/dunkin.png" alt="Dunkin' Donuts logo" height={100} width={100} />
                </Link>

                <Link href="vendors/frostbites" className="featured-image">
                    <Image src="/frostbites.png" alt="Frostbites logo" height={100} width={100} />
                </Link>

                <Link href="vendors/cava" className="featured-image">
                    <Image src="/cava.png" alt="Cava logo" height={100} width={100} />
                </Link>
            </div>
        </div>
    )
}

export default Features;