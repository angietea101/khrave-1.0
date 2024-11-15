// src\app\vendors\[vendorName]\create-post\page.tsx

"use client";

import PostForm from "@/components/form/PostForm";

export default function CreatePost() {
    return (
        <PostForm
            vendorName={undefined}
            isEditing={false}
        />
    );
}