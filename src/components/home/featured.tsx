import React from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from '@/components/ui/ArrowRight'

const Features = () => {
    return(
        <div className="home-body-container">
            <div className={'section-title-wrapper'}>
                <p className="">featured food spots</p>
                <Link href={"vendors"} className="browse-wrapper">
                    <span>browse all</span>
                    <ArrowRight />
                </Link>
            </div>

            <div className="featured-picture-gallery">
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