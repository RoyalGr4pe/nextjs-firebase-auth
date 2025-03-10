"use client";

// Local Imports

// External Imports
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LayoutProps {
    children: React.ReactNode;
}


export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(()=> {
        if (status === "unauthenticated") {
            router.push("/");
        };

        // If the session is loading, don't do anything
        if (status === "loading") return;

        // If no session exists, redirect to login
        if (!session) {
            router.push("/")
        }
    }, [status, session, router])


    return (
        <div>
            {children}
        </div>
    );
};
