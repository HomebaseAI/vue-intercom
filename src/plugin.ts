import mitt from 'mitt';
import { getCurrentInstance, type App, type Plugin } from 'vue';
import { setupShutdown, setupUpdate, setupShow, setupHide, setupShowMessages, setupShowNewMessage, setupTrackEvent, setupGetVisitorId } from './api.js';
import type { BootOptions, CallIntercom, Intercom, IntercomEvents } from './types.js';
import { installIntercom } from './setup.js';

declare global {
  interface Window {
    Intercom: Intercom;
  }
}

export type PluginProps = {
  isInstalled: boolean;
}

const emitter = mitt<IntercomEvents>();
const INTERCOM_PROP = '$intercom';

const plugin: Plugin = {
  install: async (app: App<any>) => {
    if (!app.config.globalProperties[INTERCOM_PROP]) {
      app.config.globalProperties[INTERCOM_PROP] = {
        isReady: false,
        isInstalled: false,
      } as PluginProps;
    }
  }
}

export const useIntercom = () => {
  const instance = getCurrentInstance();
  const props = instance?.appContext.config.globalProperties[INTERCOM_PROP] as PluginProps | undefined;
  if (!instance || !props) {
    throw new Error('useIntercom must be called within a setup function');
  }

  const caller: CallIntercom = (name: string, ...args: any[]) => () => {
    if (window.Intercom) {
      window.Intercom(name, args);
    } else {
      throw new Error('Intercom is not installed yet.');
    }
  }

  return {
    boot: async (opt: BootOptions) => {
      if (!props.isInstalled) {
        await installIntercom(opt);
        caller('boot', opt);
        caller('onHide', () => emitter.emit('onHide'));
        caller('onShow', () => emitter.emit('onShow'));
        caller('onUserEmailSupplied', () => emitter.emit('onUserEmailSupplied'));
        caller('onUnreadCountChange', (count: number) => emitter.emit('onUnreadCountChange', count));
      }
      props.isInstalled = true;
    },
    shutdown: setupShutdown(caller),
    update: setupUpdate(caller),
    show: setupShow(caller),
    hide: setupHide(caller),
    showMessages: setupShowMessages(caller),
    showNewMessage: setupShowNewMessage(caller),
    trackEvent: setupTrackEvent(caller),
    getVisitorId: setupGetVisitorId(caller),
    $intercom: caller,
    emitter,
  }
}

export default plugin;
