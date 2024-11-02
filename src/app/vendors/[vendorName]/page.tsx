import { db } from "@/app/lib/db";
import Post from "@/components/Post";
import Image from "next/image";
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
            <Link className={'i-create-post-button'} href={`/vendors/${vendorName}/create-post?vendorName=${vendorName}`}>
                    <h1 className={'plus-sign'}></h1>
            </Link>
            <div className="post-wall-wrapper">
                <div className="post-wall">
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
                <Image className={'cat-sando'} src={'/cat-sando.png'} alt="cat sando" width={300} height={300} />
            </div>
        </div>
    );
}
