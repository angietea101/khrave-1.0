import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    pages:{
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "username", type: "text", placeholder: "john@gmail.com"},
                password: {label: "password", type: "password"}
            },
            async authorize(credentials) {
                const maskedCredentials = {
                    ...credentials,
                    password: "*****",
                };
                
                console.log("Attempting to authorize with:", maskedCredentials);

                if (!credentials?.username || !credentials?.password){
                    console.log("Missing credentials");
                    return null;
                }
                const existingUser = await db.user.findUnique({
                    where: {username: credentials?.username}
                })

                if(!existingUser){
                    console.log("User not found");
                    return null;
                }

                const passwordMatch = await compare(credentials.password, existingUser.password)

                if (!passwordMatch){
                    console.log("Password does not match");
                    return null
                }

                return {
                    id: `${existingUser.id}`,
                    username: existingUser.username,
                    email: existingUser.email,
                }
            }
        })
    ],
    callbacks: {
        async jwt ({ token, user }) {
            if (user) {
                return {
                    ...token,
                    username: user.username
                }
            }
            return token
        },
        
        async session ({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username
                }
            }
            return session
        },
    }
}