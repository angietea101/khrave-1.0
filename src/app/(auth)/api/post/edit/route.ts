// src\app\(auth)\api\post\edit\route.ts

import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import {writeFile, unlink} from "fs/promises";
import path from "path";

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.username) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const formData = await request.formData();
    const postId = formData.get("postId");
    const newTitle = formData.get("title")?.toString();
    const newContent = formData.get("content")?.toString();
    const newImage = formData.get("image") as File;
    // const { postId, newTitle, newContent } = await request.json();

    if (!postId || (!newTitle && !newContent)) {
        return NextResponse.json({ error: "Post ID and updated content are required." }, { status: 400 });
    }

    try {
        // Find the post to verify ownership
        const post = await db.post.findUnique({
            where: { id: Number(postId) },
            include: { author: true },
        });

        if (!post || post.author.username !== session.user.username) {
            return NextResponse.json({ error: "Post not found or permission denied." }, { status: 404 });
        }
        let imagePath = post.image;
        if (newImage) {
            const ext = newImage.name.split(".").pop();
            const fileName = `post_${postId}.${ext}`;
            const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

            // Delete old image
            if (imagePath) {
                const oldImagePath = path.join(process.cwd(), "public", imagePath);
                await unlink(oldImagePath).catch(()=> {});
            }

            // save new image
            const buffer = Buffer.from(await newImage.arrayBuffer());
            await writeFile(uploadPath, buffer);
            imagePath = `/uploads/${fileName}`;

        }

        // Update post
        const updatedPost = await db.post.update({
            where: { id: Number(postId)},
            data: {
                title: newTitle || post.title,
                content: newContent || post.content,
                image: imagePath,
            },
        });
        return NextResponse.json({ success: true, post: updatedPost })
    } catch (error) {
        console.error("Error updating post:", error)
        return NextResponse.json({ error: "Internal Server Error"}, { status: 500 });
    }
}