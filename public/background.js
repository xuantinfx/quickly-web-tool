// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    console.log(tabId, changeInfo, tab);
    //code in here will run every time a user goes onto a new tab, so you can insert your scripts into every new tab
    // inject content_script to current tab
    chrome.tabs.executeScript(tabId, {
      file: "client_script.js",
      allFrames: false,
    });
  }
});

