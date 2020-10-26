/*global chrome*/
import { sendMessageToTab } from './utils';

export const autoPlayAt15h30 = () => {
  const script = `
  vi = document.getElementsByTagName('video')[0];
  setTimeout(() => {
    vi.play();
  }, new Date().setHours(15, 30, 0).valueOf() - new Date().valueOf());`;
  return sendMessageToTab(script);
};

export const stopPlayAt15h30 = (timeoutId) => {
  const script = `
  clearTimeout(${timeoutId});
  `;
  return sendMessageToTab(script);
};
