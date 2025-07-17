chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'parse-html') {
    fetchHtml(msg.url).then(sendResponse);
    return true;
  }
});

async function fetchHtml(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'text/html',
        'User-Agent': 'Mozilla/5.0'
      }
    });
    
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Try multiple description meta tags
    const metaTag = doc.querySelector('meta[name="description"]') || 
                   doc.querySelector('meta[property="og:description"]');
    
    if (!metaTag) {
      return {
        success: false,
        error: 'No description meta tag found',
        html: html.substring(0, 1000) // Return partial HTML for debugging
      };
    }
    
    return {
      success: true,
      description: metaTag.content,
      fullTag: metaTag.outerHTML
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}