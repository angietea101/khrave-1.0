"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSession } from "next-auth/react";

const MAX_TITLE_LENGTH = 30;
const MAX_CONTENT_LENGTH = 500; 

export default function CreatePost() {
    const { data: session, status } = useSession();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const vendorName = searchParams.get('vendorName');

    // Handle title change with character limit
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= MAX_TITLE_LENGTH) {
            setTitle(value);
        }
    };

    // Handle textarea change
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= MAX_CONTENT_LENGTH) {
            setContent(value);
        }
    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await fetch('/api/post/create', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content, vendorName: vendorName })
            });
            router.push(`/vendors/${vendorName}`);
        } catch (error) {
            console.error(error);
        }

        setTitle('');
        setContent('');
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
                <Link 
                    href={`/vendors/${vendorName}`} 
                    className="view-feed-button"
                >
                    View Feed
                </Link>
                <h1>Create Post for {vendorName}</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        <div className="text-right text-sm text-gray-600">
                            {content.length}/{MAX_CONTENT_LENGTH} characters
                        </div>
                    </div>
                    <div className='p-button-wrapper'>
                        <button
                            type="submit"
                            disabled={content.length === 0 || content.length > MAX_CONTENT_LENGTH}
                            className="submit-button"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
