export type IntercomEvents = {
  onHide: undefined;
  onShow: undefined;
  onUserEmailSupplied: undefined;
  onUnreadCountChange: number;
};

export type CallIntercom = (name: string, ...args: any[]) => void;

export type Intercom = CallIntercom & {
  q: any[];
  c: (args: any[]) => void;
};

export type BootOptions = {
  app_id: string;
  email: string;
  created_at: number;
  name: string;
  user_id: string;
}

export type UpdateOptions = {
  name: string;
} & { [key: string]: any }


export type IdParam = number;

export type OnUnreadCount = (count: number) => void;


