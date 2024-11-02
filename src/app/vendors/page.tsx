import { authOptions } from '../lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';
import Image from 'next/image'; // Import Image from Next.js
import dogImage from "../../../public/dog.png";
import Link from 'next/link';
import subwayImage from '../../../public/subway-background2.png';
import chipotleImage from '../../../public/chipotle-background.jpg';
import dominosImage from '../../../public/dominos-background.jpg';
import frostyImage from '../../../public/aisu.png';
import dunkyImage from '../../../public/dunkn.png';
import gyroImage from '../../../public/gyro.png';

const page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className={'vendor-container'}>
        <Link className={'back-button'} href="/">
            <div className={'back-button-circle'}>
            <div className={`${'arrow'} ${'left'}`}></div>
            </div>
        </Link>
      <div className={'top-wrapper'}>
        <div className={`${'vendor-rectangle-wrapper'}`}>
          <h3>Find the best orders at your favorite restaurants!</h3>
          <p>Scroll through our many vendors we have available to you and more coming soon</p>
        </div>
        <Image className={'dog-image'} src={dogImage} alt="Dog" width={200} height={200} />
      </div>

      <div className={'food-items'}>
        <div className={'rectangle-link-wrapper'}>
          <Link className={'rectangle-hover'} href={"vendors/subway"}>
            <div className={'vendor-food-rectangle'}>
              <Image className={'food-rectangle-image'} src={subwayImage} alt="Subway" width={200} height={200} />
            </div>
            <span className={'link'}>Subway</span>
          </Link>
        </div>

        <div className={'rectangle-link-wrapper'}>
          <Link className={'rectangle-hover'} href={"vendors/chipotle"}>
            <div className={'vendor-food-rectangle'}>
              <Image className={'food-rectangle-image'} src={chipotleImage} alt="Chipotle" width={200} height={200} />
            </div>
            <span className={'link'}>Chipotle</span>
          </Link>
        </div>

        <div className={'rectangle-link-wrapper'}>
          <Link className={'rectangle-hover'} href={"vendors/dominos"}>
            <div className={'vendor-food-rectangle'}>
              <Image className={'food-rectangle-image'} src={dominosImage} alt="Dominos" width={200} height={200} />
            </div>
            <span className={'link'}>Dominos</span>
          </Link>
        </div>

        <div className={'rectangle-link-wrapper'}>
          <Link className={'rectangle-hover'} href={"vendors/dunkin"}>
            <div className={'vendor-food-rectangle'}>
              <Image className={'food-rectangle-image'} src={dunkyImage} alt="Dunkin Donuts" width={200} height={200} />
            </div>
            <span className={'link'}>Dunkin Donuts</span>
          </Link>
        </div>

        <div className={'rectangle-link-wrapper'}>
          <Link className={'rectangle-hover'} href={"vendors/frostbites"}>
            <div className={'vendor-food-rectangle'}>
              <Image className={'food-rectangle-image'} src={frostyImage} alt="Frostbites" width={200} height={200} />
            </div>
            <span className={'link'}>Frostbites</span>
          </Link>
        </div>

        <div className={'rectangle-link-wrapper'}>
          <Link className={'rectangle-hover'} href={"vendors/cava"}>
            <div className={'vendor-food-rectangle'}>
              <Image className={'food-rectangle-image'} src={gyroImage} alt="Cava" width={200} height={200} />
            </div>
            <span className={'link'}>Cava</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default page;
