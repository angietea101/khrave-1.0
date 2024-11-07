"use client";

import { useEffect, useState } from 'react';
import { Post as PostType } from '@/types/post'; // Ensure you have the correct import for your Post type
import Post from '@/components/Post'; // Import the Post component
import { Button } from '@/components/ui/button';

interface UserPostsProps {
    username?: string;
    postID?: number;
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

    const handleDelete = async (postId: UserPostsProps) => {
        try {
            const response = await fetch('/api/post/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId }), 
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            // Update state to remove deleted post
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='user-post-page-container'>
            <h1 className='posts-for-title'>Posts for @{username}</h1>
            {posts.length > 0 ? (
                <ul className='post-display-wrapper'>
                    {posts.map((post) => (
                        <li key={post.id} className="relative">
                            <Post 
                                id={post.id} 
                                title={post.title} 
                                content={post.content} 
                                author={post.author} 
                                vendor={post.vendor} 
                            />
                            <Button 
                                variant="destructive" 
                                size="sm"
                                className="absolute top-6 right-4" 
                                onClick={() => handleDelete(post.id)}
                            >
                                Delete
                            </Button>
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
