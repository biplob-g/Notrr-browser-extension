
export const extractPageContent = (): string => {
  // Get page title
  const pageTitle = document.title;
  
  // Get meta description
  const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  
  // Get main content by prioritizing common content containers
  const contentSelectors = [
    'article', 'main', '.content', '#content', 
    '.article', '.post', '.entry', 'section'
  ];
  
  let mainContent = '';
  
  // Try to find content using selectors
  for (const selector of contentSelectors) {
    const elements = document.querySelectorAll(selector);
    if (elements.length) {
      elements.forEach(el => {
        mainContent += el.textContent + '\n';
      });
      break;
    }
  }
  
  // If no content found with selectors, get all paragraph text
  if (!mainContent) {
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
      mainContent += p.textContent + '\n';
    });
  }
  
  // If still no content, get body text
  if (!mainContent) {
    mainContent = document.body.textContent || '';
  }
  
  // Assemble the content
  return `Page Title: ${pageTitle}
Description: ${metaDescription}
URL: ${window.location.href}
Content:
${mainContent.trim().substring(0, 15000)}`; // Limit content to prevent token overflow
};

// Function to detect if the current page is a video (YouTube, Vimeo, etc.)
export const isVideoPage = (): boolean => {
  const url = window.location.href.toLowerCase();
  return (
    url.includes('youtube.com/watch') || 
    url.includes('youtu.be/') ||
    url.includes('vimeo.com/') ||
    url.includes('dailymotion.com/video/')
  );
};
