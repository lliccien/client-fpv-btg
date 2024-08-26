export interface Transaction {
  id?: string;
  fund_id: string;
  balance?: number;
  action: Action;
  email_sms: string;
}

export enum Action {
  Subscription = "subscription",
  Cancellation = "cancellation",
}
