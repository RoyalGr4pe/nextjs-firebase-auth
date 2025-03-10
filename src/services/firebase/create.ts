// Local Imports
import { IUser } from '@/models/user';
import { firestore } from './config';
import retrieveStripeCustomer from '../stripe/retrieve-customer';
import { generateReferralCode } from '@/utils/generate-referral-code';

// External Imports
import { doc, setDoc} from 'firebase/firestore';

// This function will run when a new user signs up using Firebase Auth
export async function createUser(uid: string, email: string): Promise<IUser | void> {
    try {
        const customer = await retrieveStripeCustomer(null, email)
        // Add the user to Firestore `users` collection
        const userRef = doc(firestore, 'users', uid);
        const emptyUser: IUser = {
            id: uid,
            connectedAccounts: {
                discordId: null,
            }, 
            email: email,
            stripeCustomerId: customer.id,  
            subscriptions: null,  
            ebay: null,
            referral: {
                referralCode: generateReferralCode(),
                referredBy: null,
                validReferrals: [],
                rewardsClaimed: 0,
            },
            inventory: { ebay: null },
            orders: { ebay: null },
            numListings: {
                automatic: 0,
                manual: 0,
            },
            numOrders: {
                automatic: 0,
                manual: 0,
            },
            lastFetchedDate: null,
            createdAt: new Date(),  
            preferences: {
                notificationsEnabled: false,
                preferredEmail: email,
                locale: 'GB', 
            },
        };

        await setDoc(userRef, emptyUser);
        return emptyUser;
    } catch (error) {
        console.error('Error creating user in Firestore:', error);
    }
};
