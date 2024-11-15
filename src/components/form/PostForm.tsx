// src\components\form\PostForm.tsx

"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PostFormProps } from '@/types/post';
import { useSession } from "next-auth/react";

const MAX_TITLE_LENGTH = 30;
const MAX_CONTENT_LENGTH = 500; 

export default function PostForm({
    initialTitle = '',
    initialContent = '',
    vendorName= '',
    postId,
    isEditing = false,
    onEditComplete,
}: PostFormProps) {
    const { data: session, status } = useSession();
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const router = useRouter();
    const searchParams = useSearchParams();
    const vendor = vendorName || searchParams.get('vendorName');

    useEffect(() => {
        if (isEditing) {
            setTitle(initialTitle);
            setContent(initialContent);
        }
    }, [initialTitle, initialContent, isEditing]);

    function capitalizeWords(name: string | null): string {
        if (!name) return '';
        return name.replace(/\b\w/g, char => char.toUpperCase());
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= MAX_TITLE_LENGTH) {
            setTitle(value);
        }
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= MAX_CONTENT_LENGTH) {
            setContent(value);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            let updatedPost;
            if (isEditing && postId) {
                // Edit post logic
                const response = await fetch('/api/post/edit', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ postId, newTitle: title, newContent: content }),
                });
                updatedPost = await response.json();

                if (onEditComplete && updatedPost) {
                    onEditComplete(updatedPost);
                }
                window.location.reload();
            } else {
                // Create post logic
                const response = await fetch('/api/post/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, content, vendorName: vendor }),
                });
                updatedPost = await response.json();
                router.push(`/vendors/${vendor}`);
            }
        } catch (error) {
            console.error(error);
        }

        setTitle('');
        setContent('');
    };

    const handleClose = () => {
        if (isEditing) {
            if (onEditComplete) {
                onEditComplete(null); 
            }
        } else {
            router.push(`/vendors/${vendor}`);
        }
    };

    if (status === "loading") {
        return <p className='center'>Loading...</p>; 
    }

    if (!session) {
        return <p className='center not-auth'>Log in to create posts</p>; 
    }

    return (
        <main className="center">
            <div className="p-wrapper">
                <button onClick={handleClose} className="p-close-button">
                    &#10005;
                </button>
                <h1>{isEditing ? "Edit" : "Create"} Post {isEditing ? "from" : "for"} {capitalizeWords(vendor)}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            required
                            placeholder="Title"
                        />
                    </div>
                    <div>
                        <textarea
                            id="content"
                            value={content}
                            onChange={handleContentChange}
                            required
                            placeholder="Body"
                        />
                    </div>
                    <div className='p-bottom-wrapper'>
                        <div className="ml-2 text-left text-sm text-gray-600">
                            {content.length}/{MAX_CONTENT_LENGTH} characters
                        </div>
                        <div className='p-button-wrapper'>
                            <button
                                type="submit"
                                disabled={content.length === 0 || content.length > MAX_CONTENT_LENGTH}
                                className="p-submit-button"
                            >
                                {isEditing ? "Update" : "Submit"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
