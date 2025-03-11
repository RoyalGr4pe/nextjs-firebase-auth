# NextJS Firebase Authentication

This code is for firebase authentication, and using the `useSession` hook.



### .env.local
```
# Firebase Auth
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDING_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Next Auth (Generated using `openssl rand -base64 32`)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# Stripe Auth
TEST_STRIPE_SECRET_KEY=
LIVE_STRIPE_SECRET_KEY=
```