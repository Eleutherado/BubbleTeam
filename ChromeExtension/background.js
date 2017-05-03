/*
This is a background script as specified in the manifest.json file.
This script will run in the background whenever the extension is active
*/
//Importing Jquery
const script = document.createElement('script');
script.src = 'jquery-3.2.1.min.js';
document.getElementsByTagName('head')[0].appendChild(script);


chrome.storage.sync.set({ "username": null });

// Site whitelist from Alexa Top sites and from newsapi.org
const NEWS_SITES_WHITELIST = [
	"www.reddit.com",
	"www.cnn.com",
	"www.nytimes.com",
	"www.washingtonpost.com",
	"www.huffingtonpost.com",
	"www.bbc.com",
	"www.theguardian.com",
	"weather.com",
	"www.yahoo.com",
	"news.google.com",
	"www.forbes.com",
	"www.shutterstock.com",
	"accuweather.com",
	"www.accuweather.com",
	"www.bloomberg.com",
	"timesofindia.indiatimes.com",
	"www.indiatimes.com",
	"www.reuters.com",
	"www.foxnews.com",
	"www.wsj.com",
	"www.usatoday.com",
	"money.cnn.com",
	"www.wunderground.com",
	"www.cnbc.com",
	"drudgereport.com",
	"www.chron.com",
	"www.nbcnews.com",
	"www.latimes.com",
	"time.com",
	"www.chinadaily.com.cn",
	"www.usnews.com",
	"nypost.com",
	"www.theatlantic.com",
	"indianexpress.com",
	"www.cbsnews.com",
	"www.hindustantimes.com",
	"www.news.com.au",
	"economictimes.indiatimes.com",
	"www.sfgate.com",
	"www.thehindu.com",
	"www.nationalgeographic.com",
	"www.cbc.ca",
	"www.dw.com",
	"www.weather.gov",
	"thehill.com",
	"www.thedailybeast.com",
	"abcnews.go.com",
	"www.hollywoodreporter.com",
	"www.smh.com.au",
	"www.economist.com",
	"variety.com",
	"www.wired.com",
	"www.abc.net.au",
	"www.aljazeera.com",
	"arstechnica.com",
	"bigstory.ap.org",
	"www.bbc.co.uk",
	"www.breitbart.com",
	"www.businessinsider.com",
	"uk.businessinsider.com",
	"www.buzzfeed.com",
	"us.cnn.com",
	"www.dailymail.co.uk",
	"www.engadget.com",
	"www.ew.com",
	"espn.go.com",
	"www.espncricinfo.com",
	"www.ft.com",
	"www.football-italia.net",
	"fortune.com",
	"www.fourfourtwo.com",
	"www.foxsports.com",
	"news.google.co.uk",
	"news.ycombinator.com",
	"www.ign.com",
	"www.independent.co.uk",
	"mashable.com",
	"metro.co.uk",
	"www.mirror.co.uk",
	"www.mtv.com",
	"www.mtv.co.uk",
	"news.nationalgeographic.com",
	"www.newscientist.com",
	"www.newsweek.com",
	"nymag.com",
	"www.nfl.com",
	"www.polygon.com",
	"www.recode.net",
	"talksport.com",
	"techcrunch.com",
	"www.techradar.com",
	"www.theladbible.com",
	"thenextweb.com",
	"www.thesportbible.com",
	"www.telegraph.co.uk",
	"www.theverge.com"
];

// to parse the url recieved from scraper.js
var getLocation = function(href) {
    var urlParser = document.createElement("a");
    urlParser.href = href;
    return urlParser;
};


//called when user clicks the extension symbol  (Browser action)
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({url: 'viz.html'});

})


// console logs the url of any content script that sends a message
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.id == "dashboard"){
      chrome.storage.sync.get("username", (usr)=> console.log(usr.username));
      chrome.storage.sync.set({ "username": request.username });
      chrome.storage.sync.get("username", (usr)=>
			console.log(usr.username));
      sendResponse({confirm: "got username: " + request.username })
    }
    const siteUrl = getLocation(sender.tab.url);


    if (NEWS_SITES_WHITELIST.includes(siteUrl.hostname)) {
      console.log("newsUrl match!")
      chrome.storage.sync.get("username", (usr)=>{
        const data = {
        "username": usr.username,
        "url": siteUrl.href,
        }

        $.ajax("https://bubbleteam-server.herokuapp.com/url", {
        	data: JSON.stringify(data),
            method: "POST",
            contentType: "application/json",
            dataType: "json",
        })
        .done(data => console.log(data));
      });
    }
});
