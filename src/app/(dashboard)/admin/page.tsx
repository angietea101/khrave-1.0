import { authOptions } from "@/app/lib/auth"
import { getServerSession } from "next-auth"

const page = async () => {
    const session = await getServerSession(authOptions);

    if (session?.user) {
        return <h1 className="center">Admin page - welcome back {session?.user.username}</h1>
    }

    return (
        <h1 className="center">Please login to see this admin page.</h1>
    )
}

export default page