
// Listen for messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPageContent") {
    // Get the page content
    const pageContent = {
      title: document.title,
      url: window.location.href,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      content: document.body.innerText
    };
    
    // Send the content back to the extension
    sendResponse(pageContent);
  }
  
  // Required for asynchronous messaging
  return true;
});
