chrome['tabs'].onUpdated.addListener(callback);
chrome['tabs'].onActivated.addListener(callback);
chrome['tabs'].onCreated.addListener(callback);

chrome.runtime.onInstalled.addListener(function(details, tab) {
    if (details.reason == "install") {
        chrome['tabs'].query({}, function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                if (tabs && tabs[i].url.indexOf('http') === 0) {
                    chrome.tabs.executeScript(tabs[i].id, {
                        code: 'var link = document.createElement("link");link.href = chrome.extension.getURL("main.css");link.type = "text/css"; link.rel = "stylesheet"; document.getElementsByTagName("head")[0].appendChild(link);document.body.classList.add("pickaxe")'
                    });
                }
            }
        });
    }
});

function callback() {

    chrome['tabs'].query({
        active: true,
        currentWindow: true
    }, function(arrayOfTabs) {
        var tab = arrayOfTabs[0];
        chrome.storage.local.get({
            "cursor": "cursor1"
        }, function(items) {
            var cursor = items.cursor;

            if (cursor === 'cursor1') {
                cursor1ON(tab);
            } else if (cursor === 'cursor2') {
                cursor2ON(tab);
            } else if (cursor === 'cursor3') {
                cursor3ON(tab);
            } else if (cursor === 'cursor4') {
                cursor4ON(tab);
            } else {
                allOFF(tab);
            }
        });
    });
}

function cursor1ON(tab) {
    if (tab && tab.url.indexOf('http') === 0) {
        chrome['tabs'].executeScript({
            code: 'document.body.classList.remove("pickaxe", "creeper", "jedi", "sword"); document.body.classList.add("pickaxe");'
        });
    }
}

function cursor2ON(tab) {
    if (tab && tab.url.indexOf('http') === 0) {
        chrome['tabs'].executeScript({
            code: 'document.body.classList.remove("pickaxe", "creeper", "jedi", "sword"); document.body.classList.add("creeper");'
        });
    }
}

function cursor3ON(tab) {
    if (tab && tab.url.indexOf('http') === 0) {
        chrome['tabs'].executeScript({
            code: 'document.body.classList.remove("pickaxe", "creeper", "jedi", "sword"); document.body.classList.add("jedi");'
        });
    }
}

function cursor4ON(tab) {
    if (tab && tab.url.indexOf('http') === 0) {
        chrome['tabs'].executeScript({
            code: 'document.body.classList.remove("pickaxe", "creeper", "jedi", "sword"); document.body.classList.add("sword");'
        });
    }
}


function allOFF(tab) {
    if (tab && tab.url.indexOf('http') === 0) {
        chrome.tabs.executeScript({
            code: 'document.body.classList.remove("pickaxe", "creeper", "jedi", "sword");'
        });
    }
}