"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const UserAccountNav = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/admin");
  };
  return (
    <main>
      <button onClick={handleRedirect}>
        <Image
          src="/icons/user.svg"
          alt="User Profile Icon"
          width={40}
          height={40}
        />
      </button>
      {/* 
      <button className='navbar-logout-button' onClick={() => signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/login`
      })}>
          Log out
      </button>
      
      */}
    </main>
  );
};

export default UserAccountNav;
