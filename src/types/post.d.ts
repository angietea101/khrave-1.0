// src\types\post.d.ts

export interface Post {
    id: int;
    title: string;
    content: string;
    image?: string;
    author: {
        username: string;
    };
    createdAt: string;
    vendor: {
        vendorName: string;
    };
}

export interface UserPostsProps {
    username?: string;
    postID?: number;
}

export interface PostFormProps {
    initialTitle?: string;
    initialContent?: string;
    vendorName?: string | null;
    postId?: number;
    isEditing?: boolean;
    onEditComplete?: (updatedPost: Post | null) => void;
}