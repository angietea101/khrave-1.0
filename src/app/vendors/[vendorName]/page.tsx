import { Post as PostType } from '@/types/post';
import Post from "@/components/Post";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

const imageMap = {
    subway: {
        background: '/banners/subway.jpeg',
        logo: '/logos/subway.png',
    },
    chipotle: {
        background: '/banners/chipotle.jpg',
        logo: '/logos/chipotle-circle-logo.png',
    },
    dominos: {
        background: '/dominos-background.jpg',
        logo: '/dominos-circle-logo.png',
    },
};

async function fetchPosts(vendorName: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post?vendorName=${vendorName}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }

    return res.json();
}

export default async function VendorPage({
    params,
}: {
    params: { vendorName: string };
}) {
    const { vendorName } = await params;
    const posts = await fetchPosts(vendorName);
    
    const vendor = vendorName.toLowerCase() as keyof typeof imageMap;
    const vendorImages = imageMap[vendor];

    const session = await getServerSession(authOptions);

    console.log("Raw vendorName:", vendorName);
    console.log("Processed vendorName:", vendor);

    return (
        <div className="i-vendor-main">
            {/* Left Section */}
            <div className="i-vendor-left-section">
                <Link className="i-vendor-back" href={"../"}>
                    <Image
                        src="/icons/double-chevron-left.svg"
                        alt="Chevron Left Icon"
                        width={24}
                        height={24} 
                    />
                    back
                </Link>

                {/* Banner */}
                <div 
                    className="i-vendor-banner"
                    style={{
                        backgroundImage: vendorImages ? `url(${vendorImages.background})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />

                {/* Logo + Name */}
                <div className='i-vendor-logo-wrapper'>
                    <div 
                        className='i-circle'
                        style={{
                            backgroundImage: vendorImages ? `url(${vendorImages.logo})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                    <h2>{vendor}</h2>
                </div>

                <div className='i-vendor-ad-wrapper'>
                    <p>#ad</p>
                </div>

            </div>

            {/* Right Section */}
            <div className="i-vendor-post-section">
                {session ? (
                    <Link className={'i-create-post-button'} href={`/vendors/${vendorName}/create-post?vendorName=${vendorName}`}>
                        <h1 className={'plus-sign'}></h1>
                    </Link>
                ) : (
                    <p className="i-not-auth">Log in to create a post.</p>
                )}
                
                <div className='i-vendor-filter-wrapper'>
                    <h1>Sort by: <u>Newest</u></h1>
                    <h1>Filter by: <u>All</u></h1>
                </div>
                {posts.length > 0 ? (
                    posts.map((post: PostType) => (
                        <Post 
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            content={post.content}
                            image={post.image}
                            author={post.author}
                            vendor={post.vendor}
                            createdAt={post.createdAt}
                            isUserPost={false}
                        />
                    ))
                ) : (
                    <p className="no-posts center-vertically">There are zero posts :(</p>
                )}
            </div>
        </div>
    );
}
