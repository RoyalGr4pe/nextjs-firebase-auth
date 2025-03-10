"use client";

// Local Imports
import { auth } from '@/services/firebase/config';

// External Imports
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';


const SignUp = () => {
    const { data: session } = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push('/user-page');
        }
    }, [session, router]);

    const handleSignUp = async () => {
        try {
            console.log(auth)
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log({ res });

            const result = await signIn('credentials', {
                email: email,
                password: password,
                redirect: false, // Prevent automatic redirect, we will handle it
            });

            if (result?.error) {
                console.error('Error during sign-in:', result.error);
                return;
            }

            router.push('/user-page');

            setEmail('');
            setPassword('');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
                <>
                    <h1 className="text-white text-2xl mb-5">Sign Up</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                    />
                    <button
                        onClick={handleSignUp}
                        className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
                    >
                        Sign Up
                    </button>
                    <div className='flex flex-row gap-1 mt-3 justify-center'>
                        <p>Already have an account? </p>
                        <button
                            onClick={() => router.push('/login')}
                            className="text-blue-400 hover:underline"
                        >
                            Login
                        </button>
                    </div>

                </>
            </div>
        </div>
    );
};

export default SignUp;
