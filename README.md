This is a starter template for [Learn Next.js](https://nextjs.org/learn).

# How To
- Generate NEXTAUTH_SECRET `openssl rand -base64 32`
- Do DB migration `npx prisma migrate dev --name foo`

# DevOps Stuff
- Deplyoment to vercel calls `npm run vercel-build` which does
    - Prisma client generation
    - Applying Prisma migration script. 
    - Build nextjs production app package
- We make use of supabase postgres connection pooling. Hence the production secret for `DATABASE_URL` is `[DATABASE_URL]?pgbouncer=true`    
    
