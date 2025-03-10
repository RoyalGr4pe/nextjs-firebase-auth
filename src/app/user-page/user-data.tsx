"use client";

import { useSession } from 'next-auth/react';
import React from 'react'


const UserData = () => {
    const { data: session, status } = useSession();
    if (status === "loading") return <p>Loading...</p>;
    if (!session) return <p>No user session found</p>;
    console.log("Session", session);
    return (
        <div>
            <h1>User Data</h1>
            <p>{JSON.stringify(session, null, 2)}</p>
        </div>
    )
}

export default UserData
