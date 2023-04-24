import type { BootOptions, Intercom } from "./types.js";

function createIntercom(): Intercom {
  const placeholder: Intercom = (...args: any[]) => placeholder.c(args);
  placeholder.q = [];
  placeholder.c = (...args: any[]) => placeholder.q.push(args);
  return placeholder;
}

function loadWidget(appId: string) {
  return new Promise<void>((res, rej) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://widget.intercom.io/widget/${appId}`;

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
    } else {
      rej(new Error('No script tag found'));
    }
    script.addEventListener('load', () => res());
  });
}

export function installIntercom(opt: BootOptions): Promise<void> {
  return new Promise((res, rej) => {
    const intercom = window.Intercom;
    if (typeof intercom === "function") {
      intercom('reattach_activator')
      intercom('update', opt);
      res()
    } else {
      window.Intercom = createIntercom();
      if (document.readyState === 'complete') {
        loadWidget(opt.app_id).then(res).catch(rej);
      } else {
        window.addEventListener(
          'load', () => loadWidget(opt.app_id).then(res).catch(rej),
          false,
        );
      }
    }
  })
}
