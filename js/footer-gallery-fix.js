/**
 * Fix for footer gallery lightbox - ensures correct image opens when clicked
 * This fixes the issue where clicking a thumbnail opens a different image
 * 
 * The issue occurs when Lightbox2 builds the album array - it finds all links
 * with the same data-lightbox value, but the order might not match the visual order.
 * This script ensures each link opens its own correct image.
 */
(function() {
	'use strict';
	
	// Wait for DOM and jQuery to be ready
	function initFooterGallery() {
		// Check if jQuery and lightbox are available
		if (typeof jQuery === 'undefined' || typeof lightbox === 'undefined') {
			// Retry after a short delay
			setTimeout(initFooterGallery, 100);
			return;
		}
		
		var $ = jQuery;
		
		// Find the footer gallery container (should only be one per page)
		var $footerGallery = $('footer .wrap-gallery-footer');
		
		if ($footerGallery.length === 0) {
			return;
		}
		
		// Get only the links within the footer (not any duplicates)
		var $galleryLinks = $footerGallery.find('.item-gallery-footer[data-lightbox="gallery-footer"]');
		
		if ($galleryLinks.length === 0) {
			return;
		}
		
		// Override Lightbox2's start method to use our correctly ordered album
		var originalStart = lightbox.start.bind(lightbox);
		var $window = $(window);
		
		lightbox.start = function($link) {
			// Check if this is a footer gallery link
			var dataLightboxValue = $link.attr('data-lightbox');
			
			if (dataLightboxValue === 'gallery-footer') {
				// Build album in the correct order from footer gallery ONLY
				var album = [];
				var imageNumber = 0;
				var clickedElement = $link[0]; // Get the actual DOM element
				
				$galleryLinks.each(function(index) {
					var $albumLink = $(this);
					album.push({
						link: $albumLink.attr('href'),
						title: $albumLink.attr('data-title') || $albumLink.attr('title') || ''
					});
					
					// Find the index of the clicked image by comparing DOM elements
					if (this === clickedElement) {
						imageNumber = index;
					}
				});
				
				// Set the album
				lightbox.album = album;
				lightbox.currentImageIndex = imageNumber;
				
				// Manually do what start() does, but with our correct album
				$window.on('resize', $.proxy(lightbox.sizeOverlay, lightbox));
				
				$('select, object, embed').css({
					visibility: 'hidden'
				});
				
				lightbox.sizeOverlay();
				
				// Position Lightbox
				var top = $window.scrollTop() + lightbox.options.positionFromTop;
				var left = $window.scrollLeft();
				lightbox.$lightbox.css({
					top: top + 'px',
					left: left + 'px'
				}).fadeIn(lightbox.options.fadeDuration);
				
				// Disable scrolling of the page while open
				if (lightbox.options.disableScrolling) {
					$('body').addClass('lb-disable-scrolling');
				}
				
				// Show the correct image
				lightbox.changeImage(imageNumber);
			} else {
				// For other lightboxes, use original behavior
				originalStart($link);
			}
		};
	}
	
	// Initialize when DOM is ready
	// Use jQuery ready if available, otherwise use DOMContentLoaded
	if (typeof jQuery !== 'undefined') {
		jQuery(document).ready(function() {
			// Wait a bit longer to ensure lightbox is fully initialized
			setTimeout(initFooterGallery, 200);
		});
	} else if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function() {
			setTimeout(initFooterGallery, 200);
		});
	} else {
		// DOM is already ready, but wait a bit for jQuery/lightbox to load
		setTimeout(initFooterGallery, 200);
	}
})();

