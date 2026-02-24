# PureTone Labs

E-commerce based website for selling a wide range of headphones

## Teck Stack

**Front End**
- React 18 + Vite
- React Router
- Axios for API calls
- Auth0 React SDK

**Backend**
- Node.js + Express
- MongoDB (Atlas)
- JWT verification with Auth0 (`express-jwt + jwks-rsa`)

## Sources
Hero: [Photo by Adrien Olichon](https://www.pexels.com/photo/black-and-white-photography-of-sand-2387819/)
Hero: [Photo By Jason Leung](https://unsplash.com/photos/black-and-white-headphones-on-white-background-Q2RIZtBTtaI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

## Stripe Checkout Setup

Create a `.env` file in `server/` with:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLIENT_URL=http://localhost:5173
PORT=5000
```

`STRIPE_SECRET_KEY` is required for creating Stripe Checkout Sessions.
`STRIPE_WEBHOOK_SECRET` is required to verify Stripe webhook events.
`CLIENT_URL` is used for Checkout success/cancel redirects.
      
