"use client"

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSession } from "next-auth/react";

export default function CreatePost() {
    const { data: session, status } = useSession();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const vendorName = searchParams.get('vendorName');

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
                <h1 className="">Create Post for {vendorName}</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter post title"
                        />
                    </div>
                    <div>
                        <label htmlFor="content">
                            Content:
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            placeholder= "Write your content here..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-secondary text-xl font-semibold rounded-full py-3 hover:bg-yellow-800 transition duration-300 ease-in-out"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </main>
    );
    
}
