import React from "react";
import Image from "next/image";
import Link from "next/link";

const Features = () => {
    return(
        <div className="container mx-auto pl-12 pr-12 mb-10">
            <div className={'featuredTitle'}>
                <p className="text-4xl font-bold text-black">featured food spots</p>
                <Link href={"vendors"}>
                    <p className="text-2xl font-regular text-black">browse all</p>
                </Link>
            </div>
        <div className="ml-7 grid grid-cols-6 gap-8">
            <Link href = "vendors/subway">
                <button className="w-[140px] h-[170px] rounded-[100px] shadow-md bg-white hover:shadow-xl hover:bg-secondary border-4 border-secondary z-0">
                    <Image src="/subway.png" alt="Subway" height={200} width={200} className="bottom-0 right-0"/>
                </button>
            </Link>
            <Link href = "vendors/chipotle">
                <button className="w-[140px] h-[170px] rounded-[100px] shadow-md bg-white hover:shadow-xl hover:bg-secondary border-4 border-secondary z-0 pl-4">
                    <Image src={'/chipotle1.png'} alt="Chipotle" height={100} width={100} className="bottom-0 right-0"/>
                </button>
            </Link>
            <Link href = "vendors/dominos">
                <button className="w-[140px] h-[170px] rounded-[100px] shadow-md bg-white hover:shadow-xl hover:bg-secondary border-4 border-secondary z-0 pt-3">
                    <Image src={'/dominos.png'} alt="Dominoes" height={200} width={200} className="bottom-0 right-0"/>
                </button>
            </Link>
            <button className="w-[140px] h-[170px] rounded-[100px] shadow-md bg-white hover:shadow-xl hover:bg-secondary border-4 border-secondary z-0 pb-2 pl-5">
                <Image src={'/dunkin.png'} alt="Dunkin Donuts" height={100} width={100} className="bottom-0 right-0"/>
            </button>
            <button className="w-[140px] h-[170px] rounded-[100px] shadow-md bg-white hover:shadow-xl hover:bg-secondary border-4 border-secondary z-0 pl-4">
                <Image src={'/frostbites.png'} alt="Frostbites" height={100} width={100} className="bottom-0 right-0"/>
            </button>
            <button className="w-[140px] h-[170px] rounded-[100px] shadow-md bg-white hover:shadow-xl hover:bg-secondary border-4 border-secondary z-0 pl-4">
                <Image src={'/cava.png'} alt="Cava" height={100} width={100} className="bottom-0 right-0"/>
            </button>

        </div>
        </div>
    )
}

export default Features;