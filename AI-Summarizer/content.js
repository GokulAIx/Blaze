// This script runs on the actual web page.
// It waits for a message from the sidebar.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Check if the message is asking for the page text
  if (request.action === "getPageText") {
    console.log("Content script received request for page text.");

    // Use the exact same logic as before to grab the text
    let textToSummarize = "";
    const paragraphs = document.querySelectorAll("p");
    paragraphs.forEach(p => {
      textToSummarize += p.innerText + "\n";
    });

    // Fallback if no paragraphs exist
    if (!textToSummarize.trim()) {
      textToSummarize = document.body.innerText;
    }

    // Send the extracted text back to the sidebar
    sendResponse({ text: textToSummarize });
  }
});