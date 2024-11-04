import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    // Validate id parameter
    const postId = parseInt(id);
    if (isNaN(postId)) {
        return NextResponse.json({ success: 0, message: "Invalid 'id' parameter" }, { status: 400 });
    }

    // Retrieve session
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.username) {
        return NextResponse.json({ success: 0, message: 'Unauthorized' }, { status: 401 });
    }

    // Find the user ID
    const user = await db.user.findUnique({
        where: { username: session.user.username },
        select: { id: true }
    });

    if (!user) {
        return NextResponse.json({ success: 0, message: "User not found" }, { status: 404 });
    }

    try {
        // Delete post by authorId
        const deletePost = await db.post.delete({
            where: {
                id: postId,
                authorId: user.id 
            },
        });

        return NextResponse.json({ success: 1, message: "Delete success" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: 0, message: "Failed to delete post" }, { status: 500 });
    }
}
