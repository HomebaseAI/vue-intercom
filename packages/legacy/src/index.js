/* globals window, document */
import { callIf, assert, mapInstanceToProps } from './util'
import * as internal from '@homebaseai/intercom-api';

let Vue
const init = ({ appId }) => {
  assert(Vue, 'call Vue.use(VueIntercom) before creating an instance')

  const vm = new Vue({
    data() {
      return {
        ready: false,
        visible: false,
        unreadCount: 0
      }
    }
  })

  const callIntercom = (...args) => window.Intercom(...args)

  const intercom = { _vm: vm }

  Object.defineProperties(
    intercom,
    mapInstanceToProps(vm, ['ready', 'visible', 'unreadCount'])
  )

  intercom._call = callIntercom
  intercom._init = () => {
    vm.ready = true

    callIntercom('onHide', () => (vm.visible = false))
    callIntercom('onShow', () => (vm.visible = true))
    callIntercom(
      'onUnreadCountChange',
      unreadCount => (vm.unreadCount = unreadCount)
    )
  }
  intercom.boot = (options = { app_id: appId }) => {
    callIf(!options.app_id, () => (options.app_id = appId));
    internal.boot(options);
  }
  intercom.shutdown = internal.shutdown;
  intercom.update = internal.update;
  intercom.show = internal.show;
  intercom.hide = internal.hide;
  intercom.showMessages = internal.showMessages;
  intercom.showNewMessage = internal.showNewMessage;
  intercom.trackEvent = internal.trackEvent;
  intercom.getVisitorId = internal.getVisitorId;

  return intercom
}

let installed

init.install = function install(_Vue, { appId }) {
  assert(!Vue, 'already installed.')
  Vue = _Vue
  const vueIntercom = init({ appId })
  Vue.mixin({
    mounted() {
      callIf(!installed, () => {
        internal.installIntercom({ app_id: appId }).then(() => {
          console.log('bruh');
          this.$intercom._init();
          installed = true
        });
      })
    }
  })
  Object.defineProperty(Vue.prototype, '$intercom', {
    get: () => vueIntercom
  })
}

init.loadScript = function loadScript(appId, done) {
  const script = document.createElement('script')
  script.async = true
  script.src = `https://widget.intercom.io/widget/${appId}`
  const firstScript = document.getElementsByTagName('script')[0]
  firstScript.parentNode.insertBefore(script, firstScript)
  script.onload = done
}

export default init
