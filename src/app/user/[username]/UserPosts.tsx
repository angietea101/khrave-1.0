"use client";

import { useEffect, useState } from 'react';
import { Post as PostType, UserPostsProps } from '@/types/post';
import Post from '@/components/Post';
import { Button } from '@/components/ui/button';
import PostForm from '@/components/form/PostForm';
import Image from 'next/image';

const UserPosts: React.FC<UserPostsProps> = ({ username }) => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingPost, setEditingPost] = useState<number | null>(null);

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
                    console.log('Fetched posts:', data);
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

    const handleEditComplete = (updatedPost: PostType | null) => {
        if (updatedPost) {
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === updatedPost.id ? { ...post, ...updatedPost } : post
                )
            );
        } else {
            setEditingPost(null);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-post-page-container">
            <h1 className="posts-for-title">Posts for @{username}</h1>
            {posts.length > 0 ? (
                <ul className="post-display-wrapper">
                    {posts.map((post) =>
                        editingPost === post.id ? (
                            <div
                                key={post.id}
                                className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50"
                            >
                                <div className="p-8 rounded shadow-lg w-full">
                                    <PostForm
                                        initialTitle={post.title}
                                        initialContent={post.content}
                                        vendorName={post.vendor.vendorName}
                                        postId={post.id}
                                        isEditing={true}
                                        onEditComplete={handleEditComplete}
                                    />
                                </div>
                            </div>
                        ) : (
                            <li key={post.id} className="relative">
                                <Post
                                    id={post.id}
                                    title={post.title}
                                    content={post.content}
                                    image={post.image}
                                    author={post.author}
                                    vendor={post.vendor}
                                    isUserPost={true}
                                    createdAt={post.createdAt}
                                />
                                <div className="absolute top-6 right-8 flex items-center space-x-2">
                                    <button 
                                        onClick={() => setEditingPost(post.id)}
                                        className='edit-icon'
                                    >
                                        <Image
                                            src="/icons/close-icon.svg"
                                            alt="Close Icon"
                                            width={24}
                                            height={24} 
                                        />
                                    </button>
                                    <button
                                        className='delete-icon'
                                        onClick={() => handleDelete(post.id)}
                                    >
                                        <Image 
                                            src="/icons/trash-icon.svg"
                                            alt="Trash Icon"
                                            width={24}
                                            height={24}
                                        />
                                    </button>
                                </div>
                            </li>
                        )
                    )}
                </ul>
            ) : (
                <p>No posts found for this user.</p>
            )}
        </div>
    );
};

export default UserPosts;
