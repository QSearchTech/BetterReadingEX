// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var hasRegisterExecuteScript = {};

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    if (tab.id in hasRegisterExecuteScript){
        chrome.tabs.sendMessage(tab.id, "browserAction Click");
    }else{
        chrome.tabs.executeScript(null,{
            file: "js/content_script.js"
        },function(){
            chrome.tabs.sendMessage(tab.id, "browserAction Click");

        });
        hasRegisterExecuteScript[tab.id] ="OK";
    }

});



// A generic onclick callback function.
function genericOnClick(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info",info);
    console.log("tab",tab);


    if (tab.id in hasRegisterExecuteScript){
        chrome.tabs.sendMessage(tab.id, "context menu Click");
    }else{
        chrome.tabs.executeScript(null,{
            file: "js/content_script.js"
        },function(){
            chrome.tabs.sendMessage(tab.id, "context menu Click");
        });
        hasRegisterExecuteScript[tab.id] ="OK";
    }


}

// Create a context menu button
var title = "QSearch Chinese Segmentation";
var id = chrome.contextMenus.create({"title": title, "contexts":["page"],
    "onclick": genericOnClick});
console.log("'page' item:" + id);
// }

