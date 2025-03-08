'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import Image from "next/image";

const UserAccountNav = () => {
  const router = useRouter();

  const handleRedirect = () => {
      router.push('/admin'); 
  };
  return (
    <main className="button-wrapper">
      <button onClick={handleRedirect}>
        <Image 
          src="/icons/user.svg"
          alt="User Profile Icon"
          width={45}
          height={45}
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
  )
}

export default UserAccountNav