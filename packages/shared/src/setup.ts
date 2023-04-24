import type { Intercom } from './types';

const createIntercom = (): Intercom => {
  // @ts-ignore
  const placeholder: Intercom = (...args: any[]) => placeholder.c(args)
  // @ts-ignore
  placeholder.q = [] as any[];
  // @ts-ignore
  placeholder.c = (args: any) => placeholder.q.push(args)
  return placeholder;
}

const loadScript = (appId: string) => new Promise<void>((res, rej) => {
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

export const installIntercom = (opt: { app_id: string }) => new Promise<void>((res, rej) => {
  if (typeof window.Intercom === 'function') {
    window.Intercom('reattach_activator');
    window.Intercom('update');
    res();
  } else {
    window.Intercom = createIntercom();
    const loaded = () => loadScript(opt.app_id).then(() => res());
    if (document.readyState === 'complete') {
      loaded()
    } else {
      window.addEventListener('load', loaded, false)
    }
  }
});
