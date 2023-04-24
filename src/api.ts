import type { BootOptions, CallIntercom, UpdateOptions } from "./types.js";

export const setupShutdown = (call: CallIntercom) => call('shutdown');
export const setupBoot = (call: CallIntercom) => (opt: BootOptions) => call('boot', opt);
export const setupUpdate = (call: CallIntercom) => (options?: UpdateOptions) => call('update', options);
export const setupShow = (call: CallIntercom) => call('show');
export const setupHide = (call: CallIntercom) => call('hide');
export const setupShowMessages = (call: CallIntercom) => call('showMessages');
export const setupShowNewMessage = (call: CallIntercom) => (content: string) => call('showNewMessage', content);
export const setupTrackEvent = (call: CallIntercom) => (name: string, ...metadata: any[]) => call('trackEvent', name, ...metadata);
export const setupGetVisitorId = (call: CallIntercom) => call('getVisitorId');
