type RecordType = "automatic" | "manual";
type EmailVerification = "unverified" | "verifying" | "verified";

interface IUser {
    id: string;
    connectedAccounts: IConnectedAcccounts;
    email: string;
    stripeCustomerId: string;
    subscriptions: ISubscription[] | null;
    referral: IReferral;
    inventory: { ebay: IEbayInventory | null };
    orders: { ebay: IEbayOrders | null };
    numListings: { automatic: number, manual: number } | null;
    numOrders: { automatic: number, manual: number } | null;
    lastFetchedDate: { inventory: Date, orders: Date } | null;
    preferences: IPreferences;
    authentication: IAuthentication;
    metaData: IMetaData;
}

interface IAuthentication {
    emailVerified: EmailVerification;
}

interface IMetaData {
    createdAt: Date;
}

interface IConnectedAcccounts {
    discord: IDiscord | null;
    ebay: IEbay | null;
}

interface ISubscription {
    id: string;
    name: string;
    override: boolean;
}

interface IDiscord {
    discordId: string;
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