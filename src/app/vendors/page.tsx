import { authOptions } from '../lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';
import Image from 'next/image'; // Import Image from Next.js
import dogImage from "../../../public/dog.png";
import Link from 'next/link';
import subwayImage from '../../../public/subway.png';
import chipotleImage from '../../../public/chipotle-background.jpg';
import dominosImage from '../../../public/dominos-background.jpg';
import frostyImage from '../../../public/aisu.png';
import dunkyImage from '../../../public/dunkn.png';
import gyroImage from '../../../public/gyro.png';

const page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className={'container'}>
      <div className={'topWrapper'}>
        <Link className={'backButton'} href="/">
          <div className={'backButtonCircle'}>
            <div className={`${'arrow'} ${'left'}`}></div>
          </div>
        </Link>
        <div className={`${'rectangle'} flex flex-col pl-0`}>
          <h3 className="text-white font-bold text-xl text-left">
            Find the best orders at your favorite restaurants!
          </h3>
          <p className="font-regular text-white text-left mt-4">
            Scroll through our many vendors we have available to you and more coming soon
          </p>
        </div>
        <Image className={'image'} src={dogImage} alt="Dog" width={200} height={200} />
      </div>

      <div className={'foodItems'}>
        <div className={'rectangleLinkWrapper'}>
          <Link href={"vendors/subway"}>
            <div className={'foodRectangle'}>
              <Image className={'foodRectangleImage'} src={subwayImage} alt="Subway" width={200} height={200} />
            </div>
            <span className={'link'}>Subway</span>
          </Link>
        </div>

        <div className={'rectangleLinkWrapper'}>
          <Link href={"vendors/chipotle"}>
            <div className={'foodRectangle'}>
              <Image className={'foodRectangleImage'} src={chipotleImage} alt="Chipotle" width={200} height={200} />
            </div>
            <span className={'link'}>Chipotle</span>
          </Link>
        </div>

        <div className={'rectangleLinkWrapper'}>
          <Link href={"vendors/dominos"}>
            <div className={'foodRectangle'}>
              <Image className={'foodRectangleImage'} src={dominosImage} alt="Dominos" width={200} height={200} />
            </div>
            <span className={'link'}>Dominos</span>
          </Link>
        </div>

        <div className={'rectangleLinkWrapper'}>
          <Link href={"vendors/dunkin"}>
            <div className={'foodRectangle'}>
              <Image className={'foodRectangleImage'} src={dunkyImage} alt="Dunkin Donuts" width={200} height={200} />
            </div>
            <span className={'link'}>Dunkin Donuts</span>
          </Link>
        </div>

        <div className={'rectangleLinkWrapper'}>
          <Link href={"vendors/frostbites"}>
            <div className={'foodRectangle'}>
              <Image className={'foodRectangleImage'} src={frostyImage} alt="Frostbites" width={200} height={200} />
            </div>
            <span className={'link'}>Frostbites</span>
          </Link>
        </div>

        <div className={'rectangleLinkWrapper'}>
          <Link href={"vendors/cava"}>
            <div className={'foodRectangle'}>
              <Image className={'foodRectangleImage'} src={gyroImage} alt="Cava" width={200} height={200} />
            </div>
            <span className={'link'}>Cava</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default page;
