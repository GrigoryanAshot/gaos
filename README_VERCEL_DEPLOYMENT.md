# Vercel Deployment Guide for Admin Email

## Setup for Vercel

### 1. Environment Variables in Vercel

After deploying to Vercel, you need to add environment variables in the Vercel dashboard:

1. Go to your project on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   - `EMAIL_USER` = `gaoswebsite@gmail.com`
   - `EMAIL_PASS` = `your_gmail_app_password`

### 2. Get Gmail App Password

1. Enable 2-Step Verification on your Google account
2. Go to: https://myaccount.google.com/apppasswords
3. Generate an "App Password" for "Mail"
4. Copy the 16-character password
5. Add it as `EMAIL_PASS` in Vercel environment variables

### 3. Deploy to Vercel

The project is already configured for Vercel:
- `api/send-admin-code.js` - Serverless function for sending emails
- `vercel.json` - Vercel configuration

Just push to GitHub and Vercel will automatically deploy.

### 4. Local Development

For local development, you have two options:

**Option A: Use Vercel CLI (Recommended)**
```bash
npm install -g vercel
vercel dev
```

**Option B: Use the standalone server**
```bash
npm run start:email  # Runs on port 3001
```

## How It Works

- **On Vercel**: Uses `/api/send-admin-code` serverless function
- **Local Development**: Tries `/api/send-admin-code` first, falls back to `localhost:3001` if using standalone server

## Security Notes

- ✅ `.env` is in `.gitignore` - your credentials won't be committed
- ✅ Environment variables are set in Vercel dashboard (not in code)
- ✅ The admin access requires Alt+Ctrl+Logo click (hidden from regular users)

