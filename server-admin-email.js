/**
 * Admin Email Server
 * Simple Node.js server to send admin access codes via email
 * 
 * To run: npm run start:email
 * Make sure to install dependencies: npm install
 * 
 * For Gmail:
 * 1. Enable 2-Step Verification on your Google account
 * 2. Generate App Password: https://myaccount.google.com/apppasswords
 * 3. Create .env file with EMAIL_USER and EMAIL_PASS
 */

import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
const createTransporter = () => {
	return nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_USER || 'gaoswebsite@gmail.com',
			pass: process.env.EMAIL_PASS // App password for Gmail
		}
	});
};

// Admin email endpoint
app.post('/api/send-admin-code', async (req, res) => {
	try {
		const { email, code } = req.body;
		
		if (!email || !code) {
			return res.status(400).json({ 
				success: false, 
				message: 'Email and code are required' 
			});
		}
		
		// Create transporter
		const transporter = createTransporter();
		
		// Email content
		const mailOptions = {
			from: process.env.EMAIL_USER || 'gaoswebsite@gmail.com',
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
		
		console.log(`✅ Admin code sent to ${email}: ${code}`);
		
		res.json({ 
			success: true, 
			message: 'Code sent successfully' 
		});
	} catch (error) {
		console.error('❌ Error sending email:', error);
		res.status(500).json({ 
			success: false, 
			message: 'Failed to send email',
			error: error.message 
		});
	}
});

// Health check endpoint
app.get('/api/health', (req, res) => {
	res.json({ status: 'ok', service: 'admin-email-service' });
});

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Admin Email Server running on http://localhost:${PORT}`);
	console.log(`📧 Configured to send emails from: ${process.env.EMAIL_USER || 'gaoswebsite@gmail.com'}`);
	console.log(`\n⚠️  Make sure to create a .env file with:`);
	console.log(`   EMAIL_USER=gaoswebsite@gmail.com`);
	console.log(`   EMAIL_PASS=your_app_password_here\n`);
});
