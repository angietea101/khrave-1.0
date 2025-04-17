// src/app/user/[username]/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import UserPosts from "./UserPosts";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/styles/Profile.module.css";
import ProfileForm from "@/components/form/ProfileForm";

interface Params {
    username: string;
}

const UserPostsPage = async ({ params }: { params: Promise<Params> }) => {
    const session = await getServerSession(authOptions);
    const username = (await params).username; // Await params before accessing its properties

    // Ensure that the session user matches the username
    if (!session || session.user.username !== username) {
        return <h1 className="center not-auth">You do not have access to this page.</h1>;
    }

    return (
        <section className={styles.profilePageContainer}>
            <div className={styles.profileLeftContainer}>
                <Link className="i-vendor-back" href={"../"}>
                    <Image
                        src="/icons/double-chevron-left.svg"
                        alt="Chevron Left Icon"
                        width={24}
                        height={24} 
                    />
                    back
                </Link>
                <div className={styles.profileLeftContent}>
                    <div className={styles.profileHeaderWrapper}>
                        <img
                            className={styles.profilePhotoWrapper}
                            src='/chipotle1.png'
                            alt="Profile Photo"
                        />
                        <div>
                            <h2 className={styles.username}>@{username}</h2>
                            <button className={styles.editProfileButton}>
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    <div className={styles.profileBioWrapper}>
                        <p>No bio yet...</p>
                    </div>
                    <div className={styles.contactButtonWrapper}>
                        <button>
                            <Image
                                src="/icons/bird.svg"
                                alt="Edit Profile Icon"
                                width={24}
                                height={24}
                                draggable="false"
                            />
                        </button>
                        <button>
                            <Image
                                src="/icons/bird.svg"
                                alt="Edit Profile Icon"
                                width={24}
                                height={24}
                                draggable="false"
                            />
                        </button>
                        <button>
                            <Image
                                src="/icons/bird.svg"
                                alt="Edit Profile Icon"
                                width={24}
                                height={24}
                                draggable="false"
                            />
                        </button>
                        <button>
                            <Image
                                src="/icons/bird.svg"
                                alt="Edit Profile Icon"
                                width={24}
                                height={24}
                                draggable="false"
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.profileRightContainer}>
                <li className={styles.contentOptionsWrapper}>
                    <Link className={styles.contentOptionSelected} href={`/user/${username}`}>Posts</Link>
                    <Link className={styles.contentOption} href={`/user/${username}`}>Saved</Link>
                    <Link className={styles.contentOption} href={`/user/${username}`}>Photos</Link>
                </li>
                <UserPosts username={username} />
            </div>
        </section>
    )
};

export default UserPostsPage;
