"use client";

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const SignOutButton = () => {
    const router = useRouter();
    function handleSignOut() {
        signOut();
        router.push("/");
    }
    return (
        <button onClick={handleSignOut} className='hover:text-gray-400'>Sign Out</button>
    )
}

export default SignOutButton
