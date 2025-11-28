/**
 * Map Navigation Handler
 * Opens navigation apps on mobile when map is clicked
 */
(function() {
	'use strict';
	
	// Destination coordinates (from the Google Maps embed)
	const DESTINATION = {
		lat: 40.19839916943787,
		lng: 44.534133142145805,
		address: 'ք․ Երևան, Կարապետ Ուլնեցի 58/20Բ'
	};
	
	// Navigation app URLs
	const NAV_APPS = {
		'google': {
			name: 'Google Maps',
			url: `https://www.google.com/maps/dir/?api=1&destination=${DESTINATION.lat},${DESTINATION.lng}`
		},
		'apple': {
			name: 'Apple Maps',
			url: `http://maps.apple.com/?daddr=${DESTINATION.lat},${DESTINATION.lng}`
		},
		'waze': {
			name: 'Waze',
			url: `https://waze.com/ul?q=${DESTINATION.lat},${DESTINATION.lng}&navigate=yes`
		},
		'yandex': {
			name: 'Yandex Maps',
			url: `https://yandex.com/maps/?pt=${DESTINATION.lng},${DESTINATION.lat}&z=18&l=map`
		}
	};
	
	// Detect if device is mobile
	function isMobile() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
		       (window.innerWidth <= 768);
	}
	
	// Create navigation modal
	function createNavigationModal() {
		const modal = document.createElement('div');
		modal.id = 'navigation-modal';
		modal.className = 'navigation-modal';
		modal.innerHTML = `
			<div class="navigation-modal-content">
				<div class="navigation-modal-header">
					<h3>Open Navigation</h3>
					<button class="navigation-modal-close">&times;</button>
				</div>
				<div class="navigation-modal-body">
					<p>Choose a navigation app:</p>
					<div class="navigation-apps">
						<button class="nav-app-btn" data-app="google">
							<i class="fa fa-map"></i>
							<span>Google Maps</span>
						</button>
						<button class="nav-app-btn" data-app="apple">
							<i class="fa fa-map"></i>
							<span>Apple Maps</span>
						</button>
						<button class="nav-app-btn" data-app="waze">
							<i class="fa fa-map"></i>
							<span>Waze</span>
						</button>
						<button class="nav-app-btn" data-app="yandex">
							<i class="fa fa-map"></i>
							<span>Yandex Maps</span>
						</button>
					</div>
				</div>
			</div>
		`;
		document.body.appendChild(modal);
		return modal;
	}
	
	// Show navigation modal
	function showNavigationModal() {
		let modal = document.getElementById('navigation-modal');
		if (!modal) {
			modal = createNavigationModal();
		}
		modal.style.display = 'flex';
		
		// Close button
		modal.querySelector('.navigation-modal-close').addEventListener('click', function() {
			hideNavigationModal();
		});
		
		// Close on backdrop click
		modal.addEventListener('click', function(e) {
			if (e.target === modal) {
				hideNavigationModal();
			}
		});
		
		// App buttons
		const appButtons = modal.querySelectorAll('.nav-app-btn');
		appButtons.forEach(function(btn) {
			btn.addEventListener('click', function() {
				const app = this.getAttribute('data-app');
				openNavigationApp(app);
				hideNavigationModal();
			});
		});
	}
	
	// Hide navigation modal
	function hideNavigationModal() {
		const modal = document.getElementById('navigation-modal');
		if (modal) {
			modal.style.display = 'none';
		}
	}
	
	// Open navigation app
	function openNavigationApp(appName) {
		const app = NAV_APPS[appName];
		if (app) {
			window.open(app.url, '_blank');
		}
	}
	
	// Initialize map click handler
	function initMapNavigation() {
		// Wait for DOM to be ready
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', attachMapHandler);
		} else {
			attachMapHandler();
		}
	}
	
	// Attach click handler to map
	function attachMapHandler() {
		const mapContainer = document.querySelector('.map, #contact-map');
		if (!mapContainer) {
			return;
		}
		
		// Only enable on mobile devices
		if (!isMobile()) {
			return;
		}
		
		// Make container position relative if not already
		if (getComputedStyle(mapContainer).position === 'static') {
			mapContainer.style.position = 'relative';
		}
		
		// Create clickable overlay
		const mapOverlay = document.createElement('div');
		mapOverlay.className = 'map-navigation-overlay';
		mapOverlay.innerHTML = '<div class="map-navigation-hint"><i class="fa fa-map-marker"></i> Tap to open navigation</div>';
		mapOverlay.style.position = 'absolute';
		mapOverlay.style.top = '0';
		mapOverlay.style.left = '0';
		mapOverlay.style.right = '0';
		mapOverlay.style.bottom = '0';
		mapOverlay.style.zIndex = '10';
		mapOverlay.style.cursor = 'pointer';
		
		// Add click handler to overlay
		mapOverlay.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			showNavigationModal();
		});
		
		// Add overlay to map container
		mapContainer.appendChild(mapOverlay);
	}
	
	// Initialize
	initMapNavigation();
})();

