"use client"

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const vendorName = searchParams.get('vendorName');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            await fetch('/api/create-post', {
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

    return (
        <main className="w-full h-screen bg-primary flex items-center justify-center">
            <div className="bg-secondary p-8 rounded-2xl shadow-md max-w-md w-full">
            <Link 
    href={`/vendors/${vendorName}`} 
    className="bg-primary text-secondary py-2 px-4 rounded-full shadow-md hover:bg-yellow-800 hover:text-white transition duration-300 ease-in-out mb-5 inline-block text-lg font-semibold text-center"
>
    View Feed
</Link>
                <h1 className="text-3xl font-bold text-white mb-8">Create Post for {vendorName}</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-white text-lg font-semibold mb-2">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-4 rounded-full shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter post title"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-white text-lg font-semibold mb-2">
                            Content:
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="w-full p-4 rounded-full shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
