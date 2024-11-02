import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import UserAccountNav from './UserAccountNav';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="navbar-wrapper">
      <div className="navbar-container flex items-center px-10">
        <Link href="/" className="flex items-center">
          {/* Put image here */}
          <span className="navbar-khrave">Khrave</span>
        </Link>

        <div>
          {session?.user ? (
            <UserAccountNav />
          ) : (
            <Link href="/login" className="navbar-login-button text-blue-600 hover:text-blue-800 font-medium">
              Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;