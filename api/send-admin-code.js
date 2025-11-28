/**
 * Vercel Serverless Function for Admin Email
 * This will be deployed as a serverless function on Vercel
 */

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
	// Only allow POST requests
	if (req.method !== 'POST') {
		return res.status(405).json({ 
			success: false, 
			message: 'Method not allowed' 
		});
	}

	try {
		const { email, code } = req.body;
		
		if (!email || !code) {
			return res.status(400).json({ 
				success: false, 
				message: 'Email and code are required' 
			});
		}
		
		// Get email credentials from Vercel environment variables
		const emailUser = process.env.EMAIL_USER || process.env.VERCEL_EMAIL_USER;
		const emailPass = process.env.EMAIL_PASS || process.env.VERCEL_EMAIL_PASS;
		
		if (!emailUser || !emailPass) {
			console.error('Email credentials not configured');
			return res.status(500).json({ 
				success: false, 
				message: 'Email service not configured' 
			});
		}
		
		// Create transporter
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: emailUser,
				pass: emailPass
			}
		});
		
		// Email content
		const mailOptions = {
			from: emailUser,
			to: email,
			subject: 'GAOS Admin Access Code',
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
					<h2 style="color: #ec1d25;">GAOS Admin Access Code</h2>
					<p>Your admin access code is:</p>
					<div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px; border: 2px solid #ec1d25;">
						<h1 style="color: #ec1d25; font-size: 32px; letter-spacing: 5px; margin: 0;">${code}</h1>
					</div>
					<p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
					<p style="color: #666; font-size: 14px;">If you did not request this code, please ignore this email.</p>
				</div>
			`
		};
		
		// Send email
		await transporter.sendMail(mailOptions);
		
		console.log(`✅ Admin code sent to ${email}`);
		
		return res.status(200).json({ 
			success: true, 
			message: 'Code sent successfully' 
		});
	} catch (error) {
		console.error('❌ Error sending email:', error);
		return res.status(500).json({ 
			success: false, 
			message: 'Failed to send email',
			error: error.message 
		});
	}
}

