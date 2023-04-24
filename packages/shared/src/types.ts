declare global {
  interface Window {
    Intercom: Intercom;
  }
}

export type IntercomEvents = {
  onHide: undefined;
  onShow: undefined;
  onUserEmailSupplied: undefined;
  onUnreadCountChange: number;
};

export type Intercom = (...args: any[]) => any & {
  q: any[];
  c: (args: any[]) => void;
};

export type BootOptions = {
  app_id: string;
  email: string;
  created_at: number;
  name: string;
  user_id: string;
  hide_default_launcher: boolean;
  custom_launcher_selector: string;
}

export type UpdateOptions = {
  name: string;
} & { [key: string]: any }


export type IdParam = number;

export type OnUnreadCount = (count: number) => void;


