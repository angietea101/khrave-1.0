"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PostFormProps } from '@/types/post';
import { useSession } from "next-auth/react";

export default function ProfileForm({
    initialUsername = '',
    initialBio = '',
    initialLinks = ['']
}) {
    return (
        <main>
            
        </main>
    )
}