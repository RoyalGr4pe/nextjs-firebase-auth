'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    function handleRoute(path: string) {
        router.push(path);
    }

    return (
        <main className="flex flex-col justify-center items-center gap-4 min-h-screen">
            <button onClick={() => { handleRoute("/login")}} className='hover:text-gray-300'>
                Login
            </button>
            <button onClick={() => { handleRoute("/sign-up") }} className='hover:text-gray-300'>
                Sign Up
            </button>
        </main>
    )
}