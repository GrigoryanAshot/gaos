# Local Admin Access Setup Guide

## Step 1: Get Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Enable **2-Step Verification** (if not already enabled)
3. Go to App Passwords: https://myaccount.google.com/apppasswords
4. Select "Mail" and "Other (Custom name)" → Enter "GAOS Admin"
5. Click "Generate"
6. Copy the 16-character password (it looks like: `abcd efgh ijkl mnop`)

## Step 2: Create .env File

Create a file named `.env` in the root directory (same folder as `package.json`) with:

```
EMAIL_USER=gaoswebsite@gmail.com
EMAIL_PASS=your_16_character_app_password_here
PORT=3001
```

**Important:** 
- Replace `your_16_character_app_password_here` with the actual password from Step 1
- Remove spaces from the app password (it should be 16 characters without spaces)
- The `.env` file is already in `.gitignore`, so it won't be committed to GitHub

## Step 3: Install Dependencies (if not already installed)

```bash
npm install
```

## Step 4: Start the Email Server

Open a terminal in the project folder and run:

```bash
npm run start:email
```

You should see:
```
🚀 Admin Email Server running on http://localhost:3001
📧 Configured to send emails from: gaoswebsite@gmail.com
```

**Keep this terminal open** - the server needs to be running for the admin access to work.

## Step 5: Start Your Website

In a **new terminal**, run:

```bash
npm start
```

This will start your website on `http://localhost:3000`

## Step 6: Test Admin Access

1. Open your website: `http://localhost:3000`
2. Press and hold **Alt + Ctrl**
3. Click on the **logo** in the navbar
4. A popup should appear
5. Check your email (`gaoswebsite@gmail.com`) for the 6-digit code
6. Enter the code in the popup
7. Click "Submit"
8. You should be redirected to `admin.html`

## Troubleshooting

**Email not sending?**
- Check that the email server is running (`npm run start:email`)
- Verify your `.env` file has the correct credentials
- Check the terminal running the email server for error messages
- Make sure you're using an App Password, not your regular Gmail password

**Can't connect to server?**
- Make sure the email server is running on port 3001
- Check that port 3001 is not being used by another application
- Try changing `PORT=3002` in `.env` and update `admin-access.js` accordingly

**Code not appearing in email?**
- Check spam folder
- Wait a few seconds (email delivery can take 10-30 seconds)
- Check the server terminal for any error messages

