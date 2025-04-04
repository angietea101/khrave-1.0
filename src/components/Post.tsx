// src/components/Post.tsx
'use client'
import { useSession} from "next-auth/react";
import { useState, useEffect} from "react";

type PostProps = {
    id: number;
    title: string;
    content?: string;
    image?: string;
    author: { username: string };
    vendor: { vendorName: string };
    createdAt: string;
    isUserPost?: boolean;
};

export default function Post({ id, title, content, image, author, isUserPost, createdAt}: PostProps) {
    const {data: session} = useSession();
    const [likes, setLikes] = useState<number>(0);
    const [hasLiked, setHasLiked] = useState<boolean>(false);
    // Fetch the number of likes 
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await fetch(`/api/post/${id}/like`);
                const data = await response.json();
                if (data.success) {
                    setLikes(data.likes);
                    setHasLiked(data.hasLiked)
                }
            } catch (error) {
                console.error("Error fetching likes:", error);
            }
        };

        fetchLikes();
    }, [id]);

    const handleLike = async () => {
        if (!session) {
            alert("You must be logged in to like this post!");
            return;
        } try {
            const response = await fetch(`/api/post/${id}/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setLikes((prevLikes) => (data.message === "Post liked" ? prevLikes + 1 : prevLikes - 1));
                    setHasLiked((prevState) => !prevState);
                }
            } else {
                console.error("Failed to like post");
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };
    const formattedContent = content?.trim().split('\n').map((line, index) => (
        <span className="post-container-desc" key={index}>
            {line}
            <br />
        </span>
    ));
    
    return (
        <div className={''}>
            <div className={'post-container'}>
                <div className={'subject-wrapper'}>
                    <h3 className="post-username">@{author.username}</h3>
                    <h3 className="post-title">{title}</h3>
                    <h3 className="post-date">{createdAt.slice(0, 10)}</h3>
                </div>
                <div className={`content-wrapper ${isUserPost ? "post-margin" : ""}`}>
                    <p className="post-container-desc">{formattedContent}</p> 
                    {image && (
                    <img 
                        src={image} 
                        alt={`Image for ${title}`} 
                        className="post-image"
                    />
                    )}
                    <button onClick={handleLike} className="like-button">
                        Like ({likes})
                    </button>
                </div>
            </div>
            
        </div>
    );
}
