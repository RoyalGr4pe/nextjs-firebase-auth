"use client";

import { useSession } from 'next-auth/react';
import React from 'react'


function formatDate(date: Date): string {
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
    console.log(formattedDate, formattedTime)

    return `${formattedDate} at ${formattedTime}`;
}

const UserData = () => {
    const { data: session, status } = useSession();
    if (status === "loading") return <p>Loading...</p>;
    if (!session) return <p>No user session found</p>;
    const user = session.user;
    return (
        <div className='w-full bg-gray-800 rounded-lg text-sm font-sans font-[500] text-gray-400 max-w-md'>
            <div className='w-full flex flex-row items-center p-4 border-b border-[#000011]'>
                <h1 className='w-full flex justify-start'>Email</h1>
                <p className='w-full flex justify-end'>{user.email}</p>
            </div>
            <div className='w-full flex flex-row items-center p-4 border-b border-[#000011]'>
                <h1 className='w-full flex justify-start'>Joined</h1>
                <p className='w-full flex justify-end'>{formatDate(new Date(user.metaData.createdAt))}</p>
            </div>
            <div className='w-full flex flex-row items-center p-4 border-b border-[#000011]'>
                <h1 className='w-full flex justify-start'>Locale</h1>
                <p className='w-full flex justify-end'>{user.preferences.locale}</p>
            </div>
            <div className='w-full flex flex-row items-center p-4 border-b border-[#000011]'>
                <h1 className='w-full flex justify-start'>Notifications</h1>
                <p className='w-full flex justify-end'>{`${user.preferences.notificationsEnabled}`}</p>
            </div>
            <div className='w-full flex flex-row items-center p-4 border-b border-[#000011]'>
                <h1 className='w-full flex justify-start'>Referral Code</h1>
                <p className='w-full flex justify-end'>{user.referral.referralCode}</p>
            </div>
            <div className='w-full flex flex-row items-center p-4 border-b border-[#000011]'>
                <h1 className='w-full flex justify-start'>Stripe Customer ID</h1>
                <p className='w-full flex justify-end'>{user.stripeCustomerId}</p>
            </div>
        </div>
    )
}

export default UserData
