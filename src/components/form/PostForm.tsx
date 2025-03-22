// src\components\form\PostForm.tsx

"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PostFormProps } from '@/types/post';
import { useSession } from "next-auth/react";

const MAX_TITLE_LENGTH = 30;
const MAX_CONTENT_LENGTH = 500; 

export default function PostForm({
    initialTitle = '',
    initialContent = '',
    initialImage = '',
    vendorName= '',
    postId,
    isEditing = false,
    onEditComplete,
}: PostFormProps) {
    const { data: session, status } = useSession();
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const vendor = vendorName || searchParams.get('vendorName');

    useEffect(() => {
        if (isEditing) {
            setTitle(initialTitle);
            setContent(initialContent);
        }
    }, [initialTitle, initialContent, initialImage, isEditing]);

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
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); 
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("vendorName", vendor || "");
        if (image) {
            formData.append("image", image);
        }
    
        try {
            let updatedPost;
            if (isEditing && postId) {
                // Edit post logic
                formData.append("postId", String(postId));
    
                const response = await fetch('/api/post/edit', {
                    method: 'PUT',
                    body: formData, 
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
                    body: formData, 
                });
    
                updatedPost = await response.json();
                router.push(`/vendors/${vendor}`);
            }
        } catch (error) {
            console.error(error);
        }
    
        setTitle('');
        setContent('');
        setImage(null);
        setPreview(null);
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
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {preview && <img src={preview} alt="Preview" className="preview-img" />} 
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
