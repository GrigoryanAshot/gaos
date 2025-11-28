/**
 * Admin Access System
 * Alt + Ctrl + Logo Click to access admin panel
 */

(function() {
	'use strict';
	
	let adminCodeAttempts = 0;
	let currentAdminCode = null;
	const ADMIN_EMAIL = 'gaoswebsite@gmail.com';
	
	// Generate random 6-digit code
	function generateAdminCode() {
		return Math.floor(100000 + Math.random() * 900000).toString();
	}
	
	// Send code to email - tries multiple methods
	async function sendCodeToEmail(code) {
		// Method 1: Try Vercel serverless function (works in production and local dev)
		// This will work on Vercel deployment and also locally if using Vercel dev
		try {
			// Use relative path for Vercel deployment, or localhost/127.0.0.1 for local server
			const hostname = window.location.hostname;
			const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
			const apiUrl = isLocal
				? `http://${hostname}:3001/api/send-admin-code`  // Local development server
				: '/api/send-admin-code';  // Vercel serverless function
			
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: ADMIN_EMAIL,
					code: code
				})
			});
			
			if (response.ok) {
				const result = await response.json();
				if (result.success) {
					console.log('✅ Code sent via API');
					return true;
				}
			}
		} catch (error) {
			console.log('API not available, trying alternative method...', error);
		}
		
		// Method 2: Try EmailJS (if configured)
		try {
			if (typeof emailjs !== 'undefined') {
				const EMAILJS_CONFIG = {
					serviceID: 'YOUR_SERVICE_ID',
					templateID: 'YOUR_TEMPLATE_ID',
					publicKey: 'YOUR_PUBLIC_KEY'
				};
				
				if (EMAILJS_CONFIG.serviceID !== 'YOUR_SERVICE_ID') {
					const templateParams = {
						to_email: ADMIN_EMAIL,
						to_name: 'GAOS Admin',
						code: code,
						message: `Your admin access code is: ${code}. This code will expire in 10 minutes.`
					};
					
					await emailjs.send(
						EMAILJS_CONFIG.serviceID,
						EMAILJS_CONFIG.templateID,
						templateParams,
						EMAILJS_CONFIG.publicKey
					);
					
					console.log('✅ Code sent via EmailJS');
					return true;
				}
			}
		} catch (error) {
			console.log('EmailJS not available or not configured');
		}
		
		// Method 3: Fallback - show code in console and alert
		console.log('⚠️ Email service not configured. Admin Code:', code);
		console.log('📧 To enable email sending:');
		console.log('1. Run: npm install express nodemailer cors dotenv');
		console.log('2. Start server: node server-admin-email.js');
		console.log('3. Configure .env file with email credentials');
		
		// Show code to user for testing
		alert('Email service not configured.\n\nAdmin Code: ' + code + '\n\nCheck console for setup instructions.');
		return true; // Allow testing even if email fails
	}
	
	// Show admin modal
	function showAdminModal() {
		const modal = document.getElementById('adminAccessModal');
		if (!modal) {
			createAdminModal();
		}
		
		const modalElement = document.getElementById('adminAccessModal');
		if (modalElement) {
			modalElement.style.display = 'block';
			currentAdminCode = generateAdminCode();
			
			// Show loading message
			const loadingMsg = document.getElementById('adminLoadingMsg');
			const errorMsg = document.getElementById('adminErrorMsg');
			if (loadingMsg) loadingMsg.style.display = 'block';
			if (errorMsg) errorMsg.style.display = 'none';
			
			// Send code to email
			sendCodeToEmail(currentAdminCode).then(() => {
				if (loadingMsg) loadingMsg.style.display = 'none';
				const codeInput = document.getElementById('adminCodeInput');
				if (codeInput) codeInput.focus();
			}).catch(() => {
				if (loadingMsg) loadingMsg.style.display = 'none';
				if (errorMsg) {
					errorMsg.textContent = 'Failed to send code. Please try again.';
					errorMsg.style.display = 'block';
				}
			});
		}
	}
	
	// Hide admin modal
	function hideAdminModal() {
		const modal = document.getElementById('adminAccessModal');
		if (modal) {
			modal.style.display = 'none';
			const codeInput = document.getElementById('adminCodeInput');
			if (codeInput) codeInput.value = '';
			const errorMsg = document.getElementById('adminErrorMsg');
			if (errorMsg) errorMsg.style.display = 'none';
			adminCodeAttempts = 0;
			currentAdminCode = null;
		}
	}
	
	// Verify code and redirect
	function verifyAdminCode(code) {
		if (code === currentAdminCode) {
			// Code is correct, redirect to admin.html
			window.location.href = 'admin.html';
		} else {
			adminCodeAttempts++;
			const errorMsg = document.getElementById('adminErrorMsg');
			if (errorMsg) {
				errorMsg.textContent = 'Invalid code. Please try again.';
				errorMsg.style.display = 'block';
			}
			
			if (adminCodeAttempts >= 3) {
				if (errorMsg) {
					errorMsg.textContent = 'Too many failed attempts. Please close and try again.';
				}
				setTimeout(() => {
					hideAdminModal();
				}, 2000);
			}
		}
	}
	
	// Create admin modal HTML
	function createAdminModal() {
		const modalHTML = `
			<div id="adminAccessModal" class="admin-modal" style="display: none;">
				<div class="admin-modal-content">
					<span class="admin-modal-close">&times;</span>
					<h2>Admin Access</h2>
					<p>Enter the confirmation code sent to your email:</p>
					<input type="text" id="adminCodeInput" placeholder="Enter code" maxlength="6" class="admin-code-input">
					<button id="adminSubmitBtn" class="admin-submit-btn">Submit</button>
					<div id="adminErrorMsg" class="admin-error-msg" style="display: none;"></div>
					<div id="adminLoadingMsg" class="admin-loading-msg" style="display: none;">Sending code to email...</div>
				</div>
			</div>
		`;
		
		document.body.insertAdjacentHTML('beforeend', modalHTML);
		
		// Add event listeners
		setupModalEvents();
	}
	
	// Setup modal event listeners
	function setupModalEvents() {
		// Close modal handlers
		const closeBtn = document.querySelector('.admin-modal-close');
		if (closeBtn) {
			closeBtn.addEventListener('click', hideAdminModal);
		}
		
		const modal = document.getElementById('adminAccessModal');
		if (modal) {
			modal.addEventListener('click', function(e) {
				if (e.target === modal) {
					hideAdminModal();
				}
			});
		}
		
		// Submit button
		const submitBtn = document.getElementById('adminSubmitBtn');
		const codeInput = document.getElementById('adminCodeInput');
		
		if (submitBtn && codeInput) {
			submitBtn.addEventListener('click', function() {
				const code = codeInput.value.trim();
				if (code.length === 6) {
					verifyAdminCode(code);
				} else {
					const errorMsg = document.getElementById('adminErrorMsg');
					if (errorMsg) {
						errorMsg.textContent = 'Please enter a 6-digit code.';
						errorMsg.style.display = 'block';
					}
				}
			});
			
			// Allow Enter key to submit
			codeInput.addEventListener('keypress', function(e) {
				if (e.key === 'Enter') {
					submitBtn.click();
				}
			});
			
			// Only allow numbers
			codeInput.addEventListener('input', function(e) {
				this.value = this.value.replace(/[^0-9]/g, '');
			});
		}
	}
	
	// Initialize admin access system
	function initAdminAccess() {
		// Wait for DOM to be ready
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', attachLogoListener);
		} else {
			attachLogoListener();
		}
	}
	
	// Attach logo click listener
	function attachLogoListener() {
		const logo = document.querySelector('.logo a, .logo-container .logo a');
		
		if (logo) {
			logo.addEventListener('click', function(e) {
				// Check if Alt + Ctrl are pressed
				if (e.altKey && e.ctrlKey) {
					e.preventDefault();
					e.stopPropagation();
					showAdminModal();
				}
			});
		}
	}
	
	// Initialize when script loads
	initAdminAccess();
})();

