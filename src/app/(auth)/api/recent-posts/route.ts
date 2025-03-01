import { NextResponse } from "next/server";
import { db } from '@/app/lib/db';

export async function GET() {
    try {
      const posts = await db.post.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          image: true,
          vendor: { select: { vendorName: true } },
        },
      });
  
      return NextResponse.json(posts);
    } catch (error) {
      console.error("Error fetching recent posts:", error);
      return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
  }