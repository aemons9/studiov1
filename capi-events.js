// VERALABS Conversions API Event Tracking
// Sends events to both browser pixel AND server-side Conversions API
// for better match quality and ad optimization.

(function() {
  var PIXEL_ID = '402155693814270';
  var CAPI_TOKEN = 'EAAjhTszT7sUBRGd5byVfZBDLJaoX1CwbsMQ6XRICz1xuUimZBZAFRGBX8zklHPISUQGnrpx4T2ZBr2XOu44jNCZAnnZCSxSGqFECakYU8khWnkswwO4JKZBE69MJ1nlYWAGZCztqtTmmOZCkwztkRUt76ZCrRFvDygNIZC1XPsSJAgtUy8vxxTq5f1UJn47R5AZCGAZDZD';
  var API_VERSION = 'v25.0';

  // Generate unique event ID for deduplication
  function generateEventId() {
    return 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Hash function for user data (SHA-256)
  async function hashData(data) {
    if (!data) return null;
    var encoder = new TextEncoder();
    var dataBuffer = encoder.encode(data.toLowerCase().trim());
    var hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    var hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
  }

  // Get user data from browser
  function getUserData() {
    return {
      client_user_agent: navigator.userAgent,
      client_ip_address: null, // Server will fill this
      fbc: getCookie('_fbc') || null,
      fbp: getCookie('_fbp') || null
    };
  }

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  // Send event to Conversions API
  async function sendServerEvent(eventName, eventId, customData) {
    var userData = getUserData();
    var payload = {
      data: [{
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: window.location.href,
        action_source: 'website',
        user_data: {
          client_user_agent: userData.client_user_agent,
          fbc: userData.fbc,
          fbp: userData.fbp
        }
      }]
    };

    if (customData) {
      payload.data[0].custom_data = customData;
    }

    try {
      var url = 'https://graph.facebook.com/' + API_VERSION + '/' + PIXEL_ID + '/events?access_token=' + CAPI_TOKEN;
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      });
    } catch (e) {
      // Silent fail — don't block user experience
    }
  }

  // Track PageView (on every page load)
  var pageViewId = generateEventId();
  if (typeof fbq !== 'undefined') {
    fbq('track', 'PageView', {}, { eventID: pageViewId });
  }
  sendServerEvent('PageView', pageViewId);

  // Track ViewContent (on landing pages)
  if (window.location.pathname === '/' || 
      window.location.pathname.includes('landing') || 
      window.location.pathname.includes('index')) {
    var viewContentId = generateEventId();
    var contentData = {
      content_name: document.title,
      content_category: 'landing_page',
      content_type: 'product'
    };
    if (typeof fbq !== 'undefined') {
      fbq('track', 'ViewContent', contentData, { eventID: viewContentId });
    }
    sendServerEvent('ViewContent', viewContentId, contentData);
  }

  // Track gallery/moodboard views
  if (window.location.pathname.includes('gallery') || 
      window.location.pathname.includes('moodboard') ||
      window.location.pathname.includes('concepts') ||
      window.location.pathname.includes('lookbook')) {
    var browseId = generateEventId();
    var browseData = {
      content_name: document.title,
      content_category: 'gallery',
      content_type: 'product_group'
    };
    if (typeof fbq !== 'undefined') {
      fbq('track', 'ViewContent', browseData, { eventID: browseId });
    }
    sendServerEvent('ViewContent', browseId, browseData);
  }

  // Track NEONWORLD demo page as Lead
  if (window.location.pathname.includes('neonworld')) {
    var leadId = generateEventId();
    var leadData = {
      content_name: 'NEONWORLD Visual Novel Demo',
      content_category: 'demo'
    };
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead', leadData, { eventID: leadId });
    }
    sendServerEvent('Lead', leadId, leadData);
  }

  // Track scroll depth (engagement signal)
  var scrollTracked = false;
  window.addEventListener('scroll', function() {
    if (scrollTracked) return;
    var scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
    if (scrollPercent > 50) {
      scrollTracked = true;
      var scrollId = generateEventId();
      if (typeof fbq !== 'undefined') {
        fbq('trackCustom', 'DeepEngagement', { scroll_depth: '50%' }, { eventID: scrollId });
      }
      sendServerEvent('DeepEngagement', scrollId, { scroll_depth: '50%' });
    }
  });

  // Track time on page (30s = engaged visitor)
  setTimeout(function() {
    var timeId = generateEventId();
    if (typeof fbq !== 'undefined') {
      fbq('trackCustom', 'TimeOnPage30s', { time_spent: '30s' }, { eventID: timeId });
    }
    sendServerEvent('TimeOnPage30s', timeId, { time_spent: '30s' });
  }, 30000);

})();
