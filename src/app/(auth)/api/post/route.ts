import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/db';

export async function GET(req: NextRequest) {
    const vendorName = req.nextUrl.searchParams.get('vendorName');
    
    if (!vendorName) {
        return NextResponse.json({ error: 'Vendor name is required' }, { status: 400 });
    }

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
            author: { select: { username: true } },
            vendor: { select: { vendorName: true } }
        },
        orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(posts);
}
