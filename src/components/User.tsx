'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

const User = () => {
    const { data: session } = useSession();
    return <pre className="whitespace-pre-wrap break-words">{JSON.stringify(session, null, 2)}</pre>
}

export default User