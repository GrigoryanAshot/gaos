# Domain Setup Guide for gaos.am

## Step 1: Add Domain in Vercel Dashboard

1. Go to: https://vercel.com/ashot-grigoryans-projects/gaos/settings/domains
2. Click **"Add Domain"**
3. Enter: `gaos.am`
4. Click **"Add"**

Vercel will show you the DNS records you need to configure.

## Step 2: Configure DNS at name.am

Log in to your name.am account and go to DNS management for `gaos.am`.

### Option A: Using A Record (Root Domain)

Add this A record:
- **Type**: `A`
- **Name**: `@` (or leave blank for root domain)
- **Value**: `76.76.21.21` (Vercel's IP address)
- **TTL**: `3600` (or default)

### Option B: Using CNAME (Recommended)

Add this CNAME record:
- **Type**: `CNAME`
- **Name**: `@` (or leave blank for root domain)
- **Value**: `cname.vercel-dns.com`
- **TTL**: `3600` (or default)

### For www Subdomain (Optional)

If you want `www.gaos.am` to work:
- **Type**: `CNAME`
- **Name**: `www`
- **Value**: `cname.vercel-dns.com`
- **TTL**: `3600` (or default)

## Step 3: Verify Configuration

After adding DNS records:

1. Wait 5-10 minutes for DNS propagation
2. Go back to Vercel dashboard: https://vercel.com/ashot-grigoryans-projects/gaos/settings/domains
3. Check the status of `gaos.am` - it should show "Valid Configuration" when ready
4. Vercel will automatically provision SSL certificate (HTTPS)

## Step 4: Test Your Domain

Once DNS is configured:
- Visit: `https://gaos.am`
- Your site should load from your custom domain!

## Troubleshooting

**Domain not working?**
- Check DNS records are correct at name.am
- Wait up to 48 hours for full DNS propagation
- Verify domain status in Vercel dashboard

**SSL Certificate Issues?**
- Vercel automatically provisions SSL - wait 5-10 minutes after DNS is configured
- Make sure DNS records are correct

**Need Help?**
- Vercel DNS Docs: https://vercel.com/docs/concepts/projects/domains
- Check domain status: https://vercel.com/ashot-grigoryans-projects/gaos/settings/domains

