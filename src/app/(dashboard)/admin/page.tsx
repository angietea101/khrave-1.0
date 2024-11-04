import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page: React.FC = async () => {
    const session = await getServerSession(authOptions);
    console.log("Session:", session);

    if (session?.user) {
        return (
            <section className="center admin-container">
                <h1>Admin page - welcome back, {session.user.username}!</h1>
                <Button asChild>
                    <Link href={`/user/${session.user.username}`}>
                        View Your Posts
                    </Link>
                </Button>
            </section>
        );
    }

    return (
        <h1 className="center not-auth">Please login to see this admin page.</h1>
    );
};

export default Page;
