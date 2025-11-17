// Subscription Form Handler
import { addSubscription } from './admin-database.js';

// Translation messages
const subscriptionMessages = {
  success: {
    hy: 'Շնորհակալություն բաժանորդագրվելու համար!',
    en: 'Thank you for subscribing!',
    ru: 'Спасибо за подписку!'
  },
  error: {
    hy: 'Սխալ է տեղի ունեցել: Խնդրում ենք փորձել ավելի ուշ:',
    en: 'An error occurred. Please try again later.',
    ru: 'Произошла ошибка. Пожалуйста, попробуйте позже.'
  },
  emailAlreadySubscribed: {
    hy: 'Այս էլ. փոստը արդեն բաժանորդագրված է',
    en: 'This email is already subscribed',
    ru: 'Этот email уже подписан'
  },
  enterEmail: {
    hy: 'Խնդրում ենք մուտքագրել էլ. փոստի հասցեն',
    en: 'Please enter your email address',
    ru: 'Пожалуйста, введите ваш email адрес'
  },
  enterValidEmail: {
    hy: 'Խնդրում ենք մուտքագրել վավեր էլ. փոստի հասցե',
    en: 'Please enter a valid email address',
    ru: 'Пожалуйста, введите действительный email адрес'
  },
  emailMissingAt: {
    hy: 'Խնդրում ենք մուտքագրել վավեր էլ. փոստի հասցե (@ սիմվոլը պարտադիր է)',
    en: 'Please enter a valid email address (@ symbol is required)',
    ru: 'Пожалуйста, введите действительный email адрес (требуется символ @)'
  }
};

// Get current language
function getCurrentLanguage() {
  return localStorage.getItem('selectedLanguage') || 'hy';
}

// Show notification popup
function showSubscriptionNotification(message, type = 'success') {
  // Remove existing notification if any
  const existingNotification = document.getElementById('subscription-notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.id = 'subscription-notification';
  notification.className = `subscription-notification subscription-notification-${type}`;
  
  // Set icon based on type
  let icon = '';
  if (type === 'success') {
    icon = '<i class="fa fa-check-circle" style="font-size: 24px; margin-right: 12px;"></i>';
  } else if (type === 'error') {
    icon = '<i class="fa fa-exclamation-circle" style="font-size: 24px; margin-right: 12px;"></i>';
  } else {
    icon = '<i class="fa fa-info-circle" style="font-size: 24px; margin-right: 12px;"></i>';
  }
  
  notification.innerHTML = `
    <div class="subscription-notification-content">
      ${icon}
      <span class="subscription-notification-message">${message}</span>
      <button class="subscription-notification-close" onclick="this.parentElement.parentElement.remove()">
        <i class="fa fa-times"></i>
      </button>
    </div>
  `;
  
  // Add styles if not already added
  if (!document.getElementById('subscription-notification-styles')) {
    const style = document.createElement('style');
    style.id = 'subscription-notification-styles';
    style.textContent = `
      .subscription-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        min-width: 320px;
        max-width: 500px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.4s ease;
        border-left: 4px solid;
      }
      
      .subscription-notification-success {
        border-left-color: #28a745;
      }
      
      .subscription-notification-error {
        border-left-color: #dc3545;
      }
      
      .subscription-notification-info {
        border-left-color: #17a2b8;
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      .subscription-notification-content {
        display: flex;
        align-items: center;
        padding: 18px 20px;
        gap: 12px;
      }
      
      .subscription-notification-message {
        flex: 1;
        font-size: 15px;
        font-weight: 500;
        color: #333;
        line-height: 1.5;
      }
      
      .subscription-notification-success .subscription-notification-message {
        color: #28a745;
      }
      
      .subscription-notification-error .subscription-notification-message {
        color: #dc3545;
      }
      
      .subscription-notification-close {
        background: none;
        border: none;
        cursor: pointer;
        color: #999;
        font-size: 16px;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s;
      }
      
      .subscription-notification-close:hover {
        color: #333;
      }
      
      @media (max-width: 576px) {
        .subscription-notification {
          top: 10px;
          right: 10px;
          left: 10px;
          min-width: auto;
          max-width: none;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds for success, 7 seconds for error
  const autoRemoveTime = type === 'success' ? 5000 : 7000;
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideInRight 0.4s ease reverse';
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 400);
    }
  }, autoRemoveTime);
}

// Handle subscription form submission
export function initSubscriptionForms() {
  // Handle all subscription forms on the page
  const subscriptionForms = document.querySelectorAll('.section-signup form');
  
  subscriptionForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const lang = getCurrentLanguage();
      const emailInput = form.querySelector('input[name="email-address"]');
      const email = emailInput?.value.trim();
      
      if (!email) {
        showSubscriptionNotification(subscriptionMessages.enterEmail[lang], 'error');
        return;
      }
      
      // Check if email contains @ symbol
      if (!email.includes('@')) {
        showSubscriptionNotification(subscriptionMessages.emailMissingAt[lang], 'error');
        return;
      }
      
      // Full email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showSubscriptionNotification(subscriptionMessages.enterValidEmail[lang], 'error');
        return;
      }
      
      try {
        await addSubscription(email);
        showSubscriptionNotification(subscriptionMessages.success[lang], 'success');
        emailInput.value = '';
      } catch (error) {
        if (error.message === 'Email already subscribed') {
          showSubscriptionNotification(subscriptionMessages.emailAlreadySubscribed[lang], 'error');
        } else {
          showSubscriptionNotification(subscriptionMessages.error[lang], 'error');
        }
        console.error('Subscription error:', error);
      }
    });
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSubscriptionForms);
} else {
  initSubscriptionForms();
}

