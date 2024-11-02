import { db } from "@/app/lib/db";
import Post from "@/components/Post";
import Link from "next/link";
import { use } from "react";

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

async function getPosts(vendorName: string) {
    const posts = await db.post.findMany({
        where: { 
            published: true,
            vendor: {
                vendorName: {
                    equals: vendorName,
                    mode: 'insensitive', 
                }
            }
        },
        include: {
            author: {
                select: { username: true }
            },
            vendor: {
                select: { vendorName: true }
            }
        },
        orderBy: {
            createdAt: 'desc' 
        }
    });
    console.log('Fetched Posts:', posts, '\n');
    return posts;
}

export default async function VendorPage({
    params,
}: {
    params: { vendorName: string };
}) {
    const { vendorName } = await params;
    const posts = await getPosts(vendorName);
    const vendor = vendorName.toLowerCase() as keyof typeof imageMap;
    const vendorImages = imageMap[vendor];

    return (
        <div className={''}>
            <div className={''}>
                <Link className={''} href="/vendors">
                    <div className={''}>
                        <div className={`${''} ${''}`}></div>
                    </div>
                </Link>
                <div className={''}>
                    <img src={vendorImages.logo} alt="Circle Image" />
                </div>
                <img src={vendorImages.background} alt={`${vendorName} background`} className={''} />
                <h1 className={''}>{vendorName}</h1>
                <Link className={''} href={`/${vendorName}/create-post?vendorName=${vendorName}`}>
                    <h1 className={''}>Create Post</h1>
                </Link>
            </div>
            {posts.map((post) => (
                <Post 
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    author={post.author}
                    vendor={post.vendor}
                />
            ))}
        </div>
    );
}
