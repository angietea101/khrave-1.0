// src/app/user/[username]/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import UserPosts from "./UserPosts";

interface Params {
    username: string;
}

const UserPostsPage = async ({ params }: { params: Promise<Params> }) => {
    const session = await getServerSession(authOptions);
    const username = (await params).username; // Await params before accessing its properties

    // Ensure that the session user matches the username
    if (!session || session.user.username !== username) {
        return <h1>You do not have access to this page.</h1>;
    }

    return (
        <section className="center">
            <UserPosts username={username} />
        </section>
    )
};

export default UserPostsPage;
