'use client'

import { signOut } from "next-auth/react"

const UserAccountNav = () => {
  return (
    <button className='navbar-logout-button' onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/login`
    })}>
        Log out
    </button>
  )
}

export default UserAccountNav