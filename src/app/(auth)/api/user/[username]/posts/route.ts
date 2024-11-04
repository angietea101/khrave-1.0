import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/db';

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
    const { username } = await params;

    try {
        const posts = await db.post.findMany({
            where: {
                author: {
                    username: {
                        equals: username,
                        mode: 'insensitive',
                    },
                },
                published: true, 
            },
            include: {
                author: {
                    select: { username: true },
                },
                vendor: {
                    select: { vendorName: true },
                },
            },
            orderBy: {
                createdAt: 'desc', 
            },
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        return NextResponse.json({ error: 'Failed to retrieve posts' }, { status: 500 });
    }
}
