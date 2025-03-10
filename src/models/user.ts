// External Imports

type RecordType = "automatic" | "manual";

interface IUser {
    id: string;
    connectedAccounts: IConnectedAcccounts;
    email: string;
    stripeCustomerId: string;
    subscriptions: ISubscription[] | null;
    ebay: IEbay | null;
    referral: IReferral;
    inventory: { ebay: IEbayInventory | null };
    orders: { ebay: IEbayOrders | null };
    numListings: { automatic: number, manual: number } | null;
    numOrders: { automatic: number, manual: number } | null;
    lastFetchedDate: { inventory: Date, orders: Date } | null;
    createdAt: Date;
    preferences: IPreferences;
}


interface IConnectedAcccounts {
    discordId: string | null;
}


interface ISubscription {
    id: string;
    name: string;
    override: boolean;
}


interface IEbay {
    ebayAccessToken: string;
    ebayRefreshToken: string;
    ebayTokenExpiry: Date;
}

interface IReferral {
    referralCode: string;
    referredBy: string | null;
    validReferrals: string[];
    rewardsClaimed: number;
}


interface IEbayInventory {
    itemId: string;
    itemName: string;
    price: number;
    quantity: number;
    dateListed: Date;
    images: string[];
    recordType: RecordType;
}

interface IEbayOrders {
    additionalFees: number;
    buyerUsername: string;
    customTag: string;
    images: string[];
    itemName: string;
    legacyItemId: string;
    listingDate: Date;
    orderId: string;
    purchaseDate: Date;
    purchasePlatform: string;
    purchasePrice: number;
    quantitySold: number;
    recordType: RecordType;
    saleDate: Date;
    salePlatform: string;
    salePrice: number;
    shippingFees: number;
}

interface IPreferences {
    notificationsEnabled: boolean;
    preferredEmail: string;
    locale: string;
}


export type { IUser, ISubscription, IEbay, IReferral, IEbayInventory, IEbayOrders, IPreferences, RecordType, IConnectedAcccounts };