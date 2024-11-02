import React from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "../ui/ArrowRight";

const Recent = () => {
    return (
        <div className="home-body-container">
            <div className="section-title-wrapper">
                <p>recent orders</p>
                <Link href="/recent" className="browse-wrapper">
                    <span>browse all</span>
                    <ArrowRight />
                </Link>
            </div>

            <div className="recent-picture-gallery">
                <div className="food-rectangle">
                    {/* Redirect to actual post */}
                    <Link href="/recent" className="image-shape">
                        <Image
                            className="food-rectangle-image object-cover"
                            src="/cava_bowl.jpg"
                            alt="Cava Bowl"
                            height={200}
                            width={200}
                        />
                    </Link>
                    <h4>Cava</h4>
                    <p>User title</p>
                </div>

                <div className="food-rectangle">
                    {/* Redirect to actual post */}
                    <Link href="/recent" className="image-shape">
                        <Image
                            className="food-rectangle-image object-cover"
                            src="/pizzaaa.png"
                            alt="Dominos Pizza"
                            height={200}
                            width={200}
                        />
                    </Link>
                    <h4>Dominos</h4>
                    <p>User title</p>
                </div>

                <div className="food-rectangle">
                    {/* Redirect to actual post */}
                    <Link href="/recent" className="image-shape">
                        <Image
                            className="food-rectangle-image object-cover"
                            src="/custom_coffee.jpg"
                            alt="Custom Coffee"
                            height={200}
                            width={200}
                        />
                    </Link>
                    <h4>Dunkin' Donuts</h4>
                    <p>User title</p>
                </div>

                <div className="food-rectangle">
                    {/* Redirect to actual post */}
                    <Link href="/recent" className="image-shape">
                        <Image
                            className="food-rectangle-image object-cover"
                            src="/frostbites.jpg"
                            alt="Frostbites"
                            height={200}
                            width={200}
                        />
                    </Link>
                    <h4>Frostbites</h4>
                    <p>User title</p>
                </div>
            </div>
        </div>
    );
}

export default Recent;
