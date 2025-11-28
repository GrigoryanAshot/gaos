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
		
		lightbox.start = function($link) {
			// Check if this is a footer gallery link
			var dataLightboxValue = $link.attr('data-lightbox');
			
			if (dataLightboxValue === 'gallery-footer') {
				// Build album in the correct order from footer gallery
				var album = [];
				var imageNumber = 0;
				var clickedHref = $link.attr('href');
				
				$galleryLinks.each(function(index) {
					var $albumLink = $(this);
					album.push({
						link: $albumLink.attr('href'),
						title: $albumLink.attr('data-title') || $albumLink.attr('title') || ''
					});
					
					// Find the index of the clicked image
					if ($albumLink.attr('href') === clickedHref) {
						imageNumber = index;
					}
				});
				
				// Temporarily override the album building in originalStart
				// by setting the album before calling it, then restoring after
				lightbox.album = album;
				
				// Call original start method - it will rebuild the album, so we need to fix it after
				originalStart($link);
				
				// Restore our correctly ordered album and show the correct image
				lightbox.album = album;
				if (imageNumber >= 0 && imageNumber < album.length) {
					lightbox.changeImage(imageNumber);
				}
			} else {
				// For other lightboxes, use original behavior
				originalStart($link);
			}
		};
	}
	
	// Initialize when DOM is ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initFooterGallery);
	} else {
		// DOM is already ready, but wait a bit for jQuery/lightbox to load
		setTimeout(initFooterGallery, 50);
	}
})();

