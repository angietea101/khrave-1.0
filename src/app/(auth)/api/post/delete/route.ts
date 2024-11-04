import { NextResponse } from "next/server"; // Ensure you are importing the correct NextResponse
import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);

    // Log the session for debugging
    console.log("Session:", session);

    if (!session || !session.user || !session.user.username) {
        console.log("Unauthorized access attempt");
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Read the request body
    const { postId } = await request.json();
    console.log("Post ID to delete:", postId);

    if (!postId) {
        console.log("Post ID is missing");
        return NextResponse.json({ error: "Post ID is required." }, { status: 400 });
    }

    try {
        // Find the post to ensure it exists and belongs to the authenticated user
        const post = await db.post.findUnique({
            where: { id: postId },
            include: { author: true },
        });

        console.log("Post found:", post);

        // Check if the post exists and the author matches the logged-in user
        if (!post || post.author.username !== session.user.username) {
            console.log("Post not found or user does not have permission to delete");
            return NextResponse.json({ error: "Post not found or you do not have permission to delete this post." }, { status: 404 });
        }

        // Delete the post
        await db.post.delete({
            where: { id: postId },
        });

        console.log("Post deleted successfully");

        return new Response(null, { status: 204 });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
