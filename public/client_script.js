console.log('Loaded client_script.js');

chrome.runtime.onMessage.addListener(function (cmd, sender, sendResponse) {
  console.log("chrome.runtime.onMessage: " + cmd, sender);
  sendResponse(eval(cmd));
});
