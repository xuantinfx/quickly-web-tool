/*global chrome*/

export const sendMessageToTab = (script) => {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, script, null, function (response) {
        resolve(response);
      });
    });
  });
};

export const setStorageByKey = (key, val) => {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true }, function(tabs) {
      const storageKey = `${key}-${tabs[0].id}`;
      chrome.storage.sync.set({[storageKey]: val}, function () {
        resolve();
      });
    });
  })
};

export const getStorageByKey = (key) => {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true }, function(tabs) {
      const storageKey = `${key}-${tabs[0].id}`;
      chrome.storage.sync.get([storageKey], function(result) {
        resolve(result[storageKey]);
      });
    });
  })
};

export const getActiveTabUrl = () => {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true }, function(tabs) {
      resolve(tabs[0].url);
    });
  })
};
