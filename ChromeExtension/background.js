/*
This is a background script as specified in the manifest.json file.
This script will run in the background whenever the extension is active
*/

//called when user clicks the extension symbol  (Browser action)

chrome.browserAction.onClicked.addListener(function(tab) {
  //opens a tab with the url:
  chrome.tabs.create({url: 'viz.html'});
})
