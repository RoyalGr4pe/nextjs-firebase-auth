'use client'

// Local Imports
import { auth } from '@/services/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

// External Imports
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        try {
            setLoading(true);
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            if (result?.error) {
                setErrorMessage("Invalid email or password");
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                setLoading(false);
                router.push("/user-page"); // Redirect user on successful sign-in
            }
            setLoading(false);
            setEmail('');
            setPassword('');
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
                <h1 className="text-white text-2xl mb-5">Login</h1>
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
                <span className="text-red-500 text-sm">{errorMessage}</span>
                <button
                    onClick={handleSignIn}
                    className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
                >
                    {loading ? "Processing...": "Login"}
                </button>
                <div className='flex flex-row gap-1 mt-3 justify-center'>
                    <p>Don&apos;t have an account? </p>
                    <button
                        onClick={() => router.push('/sign-up')}
                        className="text-blue-400 hover:underline"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;