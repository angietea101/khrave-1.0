import { Post as PostType } from '@/types/post';
import Post from "@/components/Post";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

const imageMap = {
    subway: {
        background: '/subway-background.png',
        logo: '/subway-circle-logo.png',
    },
    chipotle: {
        background: '/chipotle-background.jpg',
        logo: '/chipotle-circle-logo.png',
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

    return (
        <div className={'i-vendor-container'}>
            <Link className={'i-back-button'} href="/vendors">
                <div className={'back-button-circle'}>
                    <div className={`${'arrow'} ${'left'}`}></div>
                </div>
            </Link>
            <div className={'i-vendor-wrapper'}>
                <div className={'i-circle'}>
                    <Image className={'i-vendor-image'} src={vendorImages.logo} width={200} height={200} alt="Circle Image" />
                </div>
                <Image className={'i-vendor-image'} src={vendorImages.background} width={2500} height={2000} alt={`${vendorName} background`} />
                <h1 className={'i-vendor-title'}>{vendorName}</h1>
            </div>
            
            {session ? (
                <Link className={'i-create-post-button'} href={`/vendors/${vendorName}/create-post?vendorName=${vendorName}`}>
                    <h1 className={'plus-sign'}></h1>
                </Link>
            ) : (
                <p className="i-not-auth">Log in to create a post.</p>
            )}

            <div className="post-wall-wrapper">
                <div className="post-wall">
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
        </div>
    );
}
