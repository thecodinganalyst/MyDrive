# MyDrive

MyDrive is a small example application built with **Next.js 14** and **TypeScript**. It demonstrates using **NextAuth** for GitHub authentication and uploading files directly to **AWS S3** through pre-signed URLs.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.local` and fill in the required environment variables (see [Environment variables](#environment-variables)).
3. Run the development server:
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Folder Structure

```
app/            Next.js app router pages and API routes
  layout.tsx    Root layout
  page.tsx      Index page
  upload/       Client page for uploading files
  api/          Serverless functions
    auth/       NextAuth configuration
    s3/         Signed URL endpoints for S3
lib/            Shared libraries
  auth.ts       NextAuth options
  s3.ts         AWS SDK client setup
styles/         Global CSS
```

### Important Files
- **app/page.tsx** – main page that checks authentication.
- **app/upload/page.tsx** – client component that uploads files.
- **app/api/s3/** – API routes generating pre-signed S3 URLs.
- **lib/auth.ts** – sets up GitHub provider for NextAuth.
- **lib/s3.ts** – configures the S3 client with credentials.

## Environment Variables

Create a `.env.local` file in the project root. It should define the following variables:

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

### Obtaining values
- **AWS_ACCESS_KEY_ID** and **AWS_SECRET_ACCESS_KEY** – Create an IAM user in the AWS console with permissions for S3. Generate access keys for that user.
- **AWS_REGION** – The region where your S3 bucket resides (e.g. `ap-southeast-1`).
- **AWS_BUCKET_NAME** – Name of the S3 bucket that will store uploaded files.
- **GITHUB_ID** and **GITHUB_SECRET** – Create an OAuth App on GitHub and set the callback URL to `http://localhost:3000/api/auth/callback/github`.
- **NEXTAUTH_SECRET** – A random string used to sign NextAuth cookies; generate with `openssl rand -base64 32` or similar.
- **NEXTAUTH_URL** – The base URL of the application. Use `http://localhost:3000` for local development.

Once the variables are configured you can start the app and log in with your GitHub account. Authenticated users can visit `/upload` to upload files to the configured S3 bucket.

