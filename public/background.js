// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const autoRunCodes = [{
  url: 'https://www.now.vn/lich-su-dat-mon',
  codeFile: 'lich_su_dat_mon_now.js',
}];

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    console.log(tabId, changeInfo, tab);
    //code in here will run every time a user goes onto a new tab, so you can insert your scripts into every new tab
    // inject content_script to current tab
    chrome.tabs.executeScript(tabId, {
      file: "client_script.js",
      allFrames: false,
    });

    const willActiveScrips = autoRunCodes.filter(autoRunCode => autoRunCode.url === tab.url).map(item => item.codeFile);

    willActiveScrips.map(codeFile => {
      console.log('run', codeFile, 'at', tab.url);
      chrome.tabs.executeScript(tabId, {
        file: codeFile,
        allFrames: false,
      });
    });
  }
});
