// src\app\(auth)\api\post\edit\route.ts

import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.username) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const { postId, newTitle, newContent } = await request.json();

    if (!postId || (!newTitle && !newContent)) {
        return NextResponse.json({ error: "Post ID and updated content are required." }, { status: 400 });
    }

    try {
        // Find the post to verify ownership
        const post = await db.post.findUnique({
            where: { id: postId },
            include: { author: true },
        });

        if (!post || post.author.username !== session.user.username) {
            return NextResponse.json({ error: "Post not found or permission denied." }, { status: 404 });
        }

        // Update post
        const updatedPost = await db.post.update({
            where: { id: postId },
            data: {
                title: newTitle || post.title,
                content: newContent || post.content,
            },
        });
        return NextResponse.json({ success: true, post: updatedPost })
    } catch (error) {
        console.error("Error updating post:", error)
        return NextResponse.json({ error: "Internal Server Error"}, { status: 500 });
    }
}