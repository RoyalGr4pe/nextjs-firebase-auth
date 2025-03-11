// Local Imports
import UserData from './user-data';
import { Layout } from './Layout';
import SignOutButton from '../components/ui/SignOutButton';
import UpdateAccountDetails from './UpdateAccountDetails';

const UserPage = () => {
    return (
        <Layout>
            <div className='flex flex-col gap-4'>
                <UserData />
                <UpdateAccountDetails />
                <div className='w-full text-center mt-4'>
                    <SignOutButton />
                </div>
            </div>

        </Layout>
    )
}

export default UserPage
