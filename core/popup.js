var cursor1;
var cursor2;
var cursor3;
var cursor4;
var alloff;
var alloptions;
var offswitcher = false;
var body;

var cursor = 'cursor1';

document.addEventListener('DOMContentLoaded', function() {
    body = document.getElementsByTagName("BODY")[0];
    cursor1 = document.getElementById("pickaxe");
    cursor2 = document.getElementById("creeper");
    cursor3 = document.getElementById("jedi");
    cursor4 = document.getElementById("sword");
    alloptions = document.getElementsByClassName("options");
    alloff = document.getElementById("alloff");

    cursor1.addEventListener('click', cursor1Click);
    cursor2.addEventListener('click', cursor2Click);
    cursor3.addEventListener('click', cursor3Click);
    cursor4.addEventListener('click', cursor4Click);
    alloff.addEventListener('click', alloffClick);

    chrome.storage.local.get({
        "cursor": "cursor1"
    }, function(items) {
        cursor = items.cursor;
        updateIcon();
    });
});

function cursor1Click() {
    cursor = 'cursor1';
    updateIcon();
    chrome.storage.local.set({
        "cursor": "cursor1"
    }, function() {});
}

function cursor2Click() {
    cursor = 'cursor2';
    updateIcon();
    chrome.storage.local.set({
        "cursor": "cursor2"
    }, function() {});
}

function cursor3Click() {
    cursor = 'cursor3';
    updateIcon();
    chrome.storage.local.set({
        "cursor": "cursor3"
    }, function() {});
}

function cursor4Click() {
    cursor = 'cursor4';
    updateIcon();
    chrome.storage.local.set({
        "cursor": "cursor4"
    }, function() {});
}


function alloffClick() {
    cursor = '';
    chrome.storage.local.set({
        "cursor": ""
    }, function() {});
    updateIcon();
    document.getElementsByClassName("wrapper")[0].classList.add("alloff");

    if (offswitcher) {
        cursor1Click();
    }
}

function allOffOn() {
    document.getElementsByClassName("wrapper")[0].classList.add("alloff");
    alloff.innerHTML = "Выключить";
    alloff.classList.add("offOn");
    offswitcher = true;
}

function allOffOff() {
    alloff.innerHTML = "Выключить";
    alloff.classList.remove("offOn");
    offswitcher = false;
}

function updateIcon() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(arrayOfTabs) {
        var tab = arrayOfTabs[0];

        var i;
        for (i = 0; i < alloptions.length; i++) {
            alloptions[i].classList.remove("selected");
        }

        if (cursor === 'cursor1') {
            cursor1.classList.add("selected");
            document.getElementsByClassName("wrapper")[0].classList.remove("alloff");
            cursor1ON(tab);
            allOffOff();

        } else if (cursor === 'cursor2') {
            cursor2.classList.add("selected");
            document.getElementsByClassName("wrapper")[0].classList.remove("alloff");
            cursor2ON(tab);
            allOffOff();

        } else if (cursor === 'cursor3') {
            cursor3.classList.add("selected");
            document.getElementsByClassName("wrapper")[0].classList.remove("alloff");
            cursor3ON(tab);
            allOffOff();

        } else if (cursor === 'cursor4') {
            cursor4.classList.add("selected");
            document.getElementsByClassName("wrapper")[0].classList.remove("alloff");
            cursor4ON(tab);
            allOffOff();

        } else {
            cursor1.classList.remove("selected");
            allOFF(tab);
            allOffOn();
        }
    });
}

function cursor1ON(tab) {
    if (tab && tab.url.indexOf('http') === 0) {
        chrome.tabs.executeScript({
            code: 'document.body.classList.remove("pickaxe", "creeper", "jedi", "sword"); document.body.classList.add("pickaxe");'
        });
    }
}

function cursor2ON(tab) {
    if (tab && tab.url.indexOf('http') === 0) {
        chrome.tabs.executeScript({
            code: 'document.body.classList.remove("pickaxe", "creeper", "jedi", "sword"); document.body.classList.add("creeper");'
        });
    }
}

function cursor3ON(tab) {
    if (tab && tab.url.indexOf('http') === 0) {
        chrome.tabs.executeScript({
            code: 'document.body.classList.remove("pickaxe", "creeper", "jedi", "sword"); document.body.classList.add("jedi");'
        });
    }
}

function cursor4ON(tab) {
    if (tab && tab.url.indexOf('http') === 0) {
        chrome.tabs.executeScript({
            code: 'document.body.classList.remove("pickaxe", "creeper", "jedi", "sword"); document.body.classList.add("sword");'
        });
    }
}


function allOFF(tab) {
    if (tab && tab.url.indexOf('http') === 0) {
        chrome.tabs.executeScript({
            code: 'document.body.classList.remove("pickaxe", "creeper", "jedi", "sword")'
        });
    }

}

showError();

function showError(tab) {

    chrome.tabs.getSelected(null, function(tab) {
        var tablink = tab.url;

        if (tablink.startsWith("chrome") || tablink.startsWith("https://chrome.google.com/webstore/")) {
            body.classList.add("notAllowed")
        }

    });
}