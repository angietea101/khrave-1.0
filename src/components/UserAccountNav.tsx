'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

const UserAccountNav = () => {
  const router = useRouter();

  const handleRedirect = () => {
      router.push('/admin'); // Redirects to /admin
  };
  return (
    <main className="button-wrapper">
      <button className='navbar-profile-button' onClick={handleRedirect}>
          Profile
      </button>
      <button className='navbar-logout-button' onClick={() => signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/login`
      })}>
          Log out
      </button>
    </main>
  )
}

export default UserAccountNav