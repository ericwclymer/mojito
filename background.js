chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    chrome.tabs.executeScript(null, { file: "global.js" });
    chrome.tabs.executeScript(null, { file: "transaction-date-range.js" });
    chrome.tabs.executeScript(null, { file: "transaction-module.js" });
    chrome.tabs.executeScript(null, { file: "mojito.js" });
});
