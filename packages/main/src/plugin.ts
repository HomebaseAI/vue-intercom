import { getCurrentInstance, type App, type Plugin } from 'vue';
import * as internal from '@homebaseai/intercom-api';
import mitt from 'mitt';

export type PluginProps = {
  isInstalled: boolean;
}

const emitter = mitt<internal.IntercomEvents>();
const INTERCOM_PROP = '$intercom';

const IntercomVue: Plugin = {
  install: async (app: App<any>) => {
    if (!app.config.globalProperties[INTERCOM_PROP]) {
      app.config.globalProperties[INTERCOM_PROP] = {
        isInstalled: false,
      } as PluginProps;
    }
  }
}

const caller = (name: string, ...args: any[]) => () => {
  if (window.Intercom) {
    window.Intercom(name, ...args);
  } else {
    throw new Error('Intercom is not installed yet.');
  }
}

export const useIntercom = () => {
  const instance = getCurrentInstance();
  const props = instance?.appContext.config.globalProperties[INTERCOM_PROP] as PluginProps | undefined;
  if (!instance || !props) {
    throw new Error('useIntercom must be called within a setup function');
  }

  return {
    boot: async (opt: internal.BootOptions) => {
      if (!props.isInstalled) {
        await internal.installIntercom(opt);
        internal.boot(opt);
        caller('onHide', () => emitter.emit('onHide'));
        caller('onShow', () => emitter.emit('onShow'));
        caller('onUserEmailSupplied', () => emitter.emit('onUserEmailSupplied'));
        caller('onUnreadCountChange', (count: number) => emitter.emit('onUnreadCountChange', count));
      }
      props.isInstalled = true;
    },
    shutdown: internal.shutdown,
    update: internal.update,
    show: internal.show,
    hide: internal.hide,
    showMessages: internal.showMessages,
    showNewMessage: internal.showNewMessage,
    trackEvent: internal.trackEvent,
    getVisitorId: internal.getVisitorId,
    $intercom: caller,
    emitter,
  }
}

export default IntercomVue;
