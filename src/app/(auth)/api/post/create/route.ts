import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const res = await request.json();
    const { title, content, vendorName } = res;

    console.log(res)


    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.username) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Find the user ID based on the username from the session
    const user = await db.user.findUnique({
        where: { username: session.user.username },
        select: { id: true }
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the vendor exists in a case-insensitive manner
    const vendor = await db.vendor.findFirst({
        where: { vendorName: { equals: vendorName, mode: 'insensitive' } }
    });

    if (!vendor) {
        console.log("VENDOR", vendor)
        return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    const result = await db.post.create({
        data: {
            title,
            content,
            published: true,
            author: { connect: { id: user.id } },
            vote: 0,
            vendor: { connect: { id: vendor.id }}
        }
    });
    

    return NextResponse.json({ result });
}
