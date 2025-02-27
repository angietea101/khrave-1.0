// src\app\(auth)\api\post\create\route.ts

import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises"
import { writeFile } from "fs/promises";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

export async function POST(request: Request) {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const vendorName = formData.get("vendorName") as string;
    const image = formData.get("image") as File | null;
    // const res = await request.json();
    // const { title, content, vendorName } = res;
    console.log({ title, content, vendorName, image });

    // console.log(res)


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

    await fs.mkdir(UPLOAD_DIR, {recursive: true})
    let imagePath: string | null = null;
    if (image) {
        const fileBuffer = Buffer.from(await image.arrayBuffer()); // Convert file to buffer
        const fileName = `${Date.now()}-${image.name.replace(/\s+/g, "_")}`; // Unique filename
        imagePath = `/uploads/${fileName}`; // Relative path for database
        const fullPath = path.join(UPLOAD_DIR, fileName); // Full path to save file

        await writeFile(fullPath, fileBuffer); // Save file to disk
    }
    const result = await db.post.create({
        data: {
            title,
            content,
            image: imagePath,
            published: true,
            author: { connect: { id: user.id } },
            vote: 0,
            vendor: { connect: { id: vendor.id }}
        }
    });
    

    return NextResponse.json({ result });
}
