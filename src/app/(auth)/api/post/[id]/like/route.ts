import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function POST(req: NextRequest, context: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.username) {
        return NextResponse.json({ success: 0, message: "Unauthorized" }, { status: 401 });
    }

    // Get post ID from URL params (idk why we have to await here even tho it says it does nothign but it fixed erro)
    const { id } = await context.params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
        return NextResponse.json({ success: 0, message: "Invalid 'id' parameter" }, { status: 400 });
    }

    // Find user in the database
    const user = await db.user.findUnique({
        where: { username: session.user.username },
        select: { id: true },
    });

    if (!user) {
        return NextResponse.json({ success: 0, message: "User not found" }, { status: 404 });
    }

    try {
        // Check if the user already liked the post !!!
        const existingLike = await db.like.findUnique({
            where: {
                userId_postId: { userId: user.id, postId },
            },
        });

        if (existingLike) {
            // Unlike the post
            await db.like.delete({
                where: { id: existingLike.id },
            });
            return NextResponse.json({ success: 1, message: "Post unliked" });
        } else {
            // Like the post
            await db.like.create({
                data: { userId: user.id, postId },
            });
            return NextResponse.json({ success: 1, message: "Post liked" });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: 0, message: "Internal server error" }, { status: 500 });
    }
}
export async function GET(req: NextRequest, context: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    const { id } = await context.params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
        return NextResponse.json({ success: 0, message: "Invalid 'id' parameter" }, { status: 400 });
    }

    try {
        
        const likesCount = await db.like.count({
            where: { postId },
        });

        let hasLiked = false;
        if (session && session.user?.username) {
            const user = await db.user.findUnique({
                where: { username: session.user.username },
                select: { id: true },
            });

            if (user) {
                const userLike = await db.like.findUnique({
                    where: { userId_postId: { userId: user.id, postId } },
                });
                hasLiked = userLike ? true : false;
            }
        }

        return NextResponse.json({ success: 1, likes: likesCount, hasLiked });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: 0, message: "Internal server error" }, { status: 500 });
    }
}
