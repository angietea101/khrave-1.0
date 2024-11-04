"use client";

import { useEffect, useState } from 'react';
import { Post as PostType } from '@/types/post'; 
import Post from '@/components/Post'; 
import { Button } from "@/components/ui/button";

interface UserPostsProps {
    username: string;
}

const UserPosts: React.FC<UserPostsProps> = ({ username }) => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (username) {
            fetch(`/api/user/${username}/posts`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch posts');
                    }
                    return response.json();
                })
                .then((data) => {
                    setPosts(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching posts:', error);
                    setLoading(false);
                });
        }
    }, [username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='user-post-page-container'>
            <h1 className='posts-for-title'>Posts for @{username}</h1>
            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Post 
                                id={post.id} 
                                title={post.title} 
                                content={post.content} 
                                author={post.author} 
                                vendor={post.vendor} 
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts found for this user.</p>
            )}
        </div>
    );
};

export default UserPosts;
