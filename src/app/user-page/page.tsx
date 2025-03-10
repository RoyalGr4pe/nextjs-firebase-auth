import React from 'react'
import { Layout } from './Layout';
import UserData from './user-data';
import SignOutButton from '../components/ui/SignOutButton';

const page = () => {
    return (
        <Layout>
            <h1>User Page</h1>
            <UserData />
            <SignOutButton />
        </Layout>
    )
}

export default page
