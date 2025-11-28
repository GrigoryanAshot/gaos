# Admin Email Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file in the root directory:**
   ```
   EMAIL_USER=gaoswebsite@gmail.com
   EMAIL_PASS=your_gmail_app_password
   PORT=3001
   ```

3. **Get Gmail App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Enable 2-Step Verification if not already enabled
   - Generate an "App Password" for "Mail"
   - Copy the 16-character password to `.env` file

4. **Start the email server:**
   ```bash
   npm run start:email
   ```

5. **Test the admin access:**
   - Press **Alt + Ctrl** and click the navbar logo
   - Enter the 6-digit code from your email
   - You'll be redirected to `admin.html`

## How It Works

- When you press **Alt + Ctrl** and click the logo, a 6-digit code is generated
- The code is sent to `gaoswebsite@gmail.com`
- Enter the code in the popup to access `admin.html`

## Troubleshooting

- **Email not sending?** Check that the email server is running on port 3001
- **Connection refused?** Make sure `npm run start:email` is running
- **Gmail authentication error?** Verify your App Password is correct in `.env`

