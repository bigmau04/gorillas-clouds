/**
 * Gorillas Clouds - Destila2 Mtr
 * Analytics & Metrics Integration Module
 * Pre-configured for Vercel Analytics, Google Analytics 4 (GA4), Meta Pixel & Hotjar/Clarity
 */

// Global Event Tracker for Sales Conversions
window.trackConversionEvent = function(eventName, eventParams = {}) {
  console.log(`[Analytics Tracked] Event: ${eventName}`, eventParams);

  // 1. Google Analytics 4 (GA4) Event Dispatcher
  if (typeof gtag === 'function') {
    gtag('event', eventName, eventParams);
  }

  // 2. Meta Pixel (Facebook / Instagram Ads)
  if (typeof fbq === 'function') {
    if (eventName === 'whatsapp_click') {
      fbq('track', 'Contact', { content_name: eventParams.product || 'General WhatsApp' });
      fbq('trackCustom', 'WhatsAppClick', eventParams);
    } else {
      fbq('trackCustom', eventName, eventParams);
    }
  }

  // 3. Vercel Analytics Custom Event
  if (window.va) {
    window.va('event', { name: eventName, data: eventParams });
  }
};

// Auto track page load & engagement metrics
document.addEventListener('DOMContentLoaded', () => {
  // Track scroll depth for conversion rate optimization (CRO)
  let maxScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
      maxScroll = scrollPercent;
      window.trackConversionEvent('scroll_depth', { depth: `${maxScroll}%` });
    }
  });

  // Track Instagram outbound click
  const igButtons = document.querySelectorAll('a[href*="instagram.com"]');
  igButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      window.trackConversionEvent('instagram_click', { destination: 'destimtr.oficial' });
    });
  });
});
