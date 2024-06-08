chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getCookies") {
    chrome.cookies
      .getAll({ domain: "pdi.heinzcorps.com" })
      .then((cookies) => {
        sendResponse({ cookies });
      })
      .catch((error) => {
        console.error("Failed to get cookies:", error);
        sendResponse({ error });
      });
    return true; // Will respond asynchronously.
  }
});
