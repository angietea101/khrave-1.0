import React from "react";
import Image from "next/image";

const Recent = () => {
    return (
        <div className="container mx-auto pl-12 pr-12 md:h-screen">
            <p className="text-4xl font-bold text-black text-left mt-20 mb-10">Recent Orders</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="foodRectangle">
                    <Image 
                        className="foodRectangleImage object-cover" 
                        src="/cava_bowl.jpg" 
                        alt="Cava Bowl" 
                        height={200} 
                        width={200} 
                    />
                </div>
                <div className="foodRectangle">
                    <Image 
                        className="foodRectangleImage object-cover" 
                        src="/pizzaaa.png" 
                        alt="Pizza" 
                        height={200} 
                        width={200} 
                    />
                </div>
                <div className="foodRectangle">
                    <Image 
                        className="foodRectangleImage object-cover" 
                        src="/custom_coffee.jpg" 
                        alt="Coffee" 
                        height={200} 
                        width={200} 
                    />
                </div>
                <div className="foodRectangle">
                    <Image 
                        className="foodRectangleImage object-cover" 
                        src="/frostbites.jpg" 
                        alt="Frost Bites" 
                        height={200} 
                        width={200} 
                    />
                </div>
            </div>
        </div>
    );
}

export default Recent;
