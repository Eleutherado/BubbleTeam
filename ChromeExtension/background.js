/*
This is a background script as specified in the manifest.json file.
This script will run in the background whenever the extension is active
*/

//called when user clicks the extension symbol  (Browser action)

chrome.browserAction.onClicked.addListener(function(tab) {
  //opens a tab with the url:
  chrome.tabs.create({url: 'viz.html'});
})

// console logs the url of any content script that sends a message
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });
