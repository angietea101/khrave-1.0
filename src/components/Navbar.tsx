import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import UserAccountNav from './UserAccountNav';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <nav>
          <Link href={'/'}>
            <h1>khrave</h1>
          </Link>
          <div className="nav-icons">
              <div>
                {session?.user ? (
                  <UserAccountNav />
                ) : (
                  <Link href="/login" className="navbar-login-button">
                    Log in
                  </Link>
                )}
              </div>
              <div>
                <span className="hamburger"></span>
                <span className="hamburger"></span>
                <span className="hamburger"></span>
              </div>
          </div>
      </nav>
    </>
  );
};

export default Navbar;