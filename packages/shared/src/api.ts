import type { BootOptions, UpdateOptions } from "./types.js";

const call = (...args: any[]) => {
  if (window.Intercom) {
    window.Intercom(...args);
  } else {
    throw new Error('Intercom has not been installed yet.');
  }
}

export const shutdown = () => call('shutdown');
export const boot = (opt: BootOptions) => call('boot', opt);
export const update = (options?: UpdateOptions) => call('update', options);
export const show = () => call('show');
export const hide = () => call('hide');
export const showMessages = () => call('showMessages');
export const showNewMessage = (content: string) => call('showNewMessage', content);
export const trackEvent = (name: string, ...metadata: any[]) => () => call('trackEvent', name, ...metadata);
export const getVisitorId = () => call('getVisitorId');
