import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { hash } from 'bcrypt';
import * as z from 'zod'

// Define the schema with Zod
const userSchema = z
  .object({
    username: z
      .string()
      .min(5, { message: "Username must be at least 5 characters." })
      .max(15, { message: "Username can't be longer than 15 characters." }),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email.")
      .max(300, { message: "Email can't be longer than 300 characters." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, username, password } = userSchema.parse(body);
        
        // Check if email already exists
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });

        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 });
        }
        
        // Check if username already exists
        const existingUserByUsername = await db.user.findUnique({
            where: { username: username }
        });

        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "User with this username already exists" }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        const { password: newUserPassword, ...rest} = newUser;

        return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 });
    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
