"use client";

// Local Imports
import { auth } from "@/services/firebase/config";

// External Imports
import { signOut as firebaseSignOut } from 'firebase/auth';
import { signOut as nextSignOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignOutButton = () => {
    const router = useRouter();
    function handleSignOut() {
        nextSignOut();
        firebaseSignOut(auth);
        router.push("/");
    }
    return (
        <button onClick={handleSignOut} className='hover:text-gray-400'>Sign Out</button>
    )
}

export default SignOutButton
