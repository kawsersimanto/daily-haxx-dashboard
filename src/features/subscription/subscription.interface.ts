export enum CurrencyEnum {
  USD = "usd",
  EUR = "eur",
  GBP = "gbp",
  CAD = "cad",
  AUD = "aud",
  JPY = "jpy",
}

export enum IntervalEnum {
  MONTH = "month",
  YEAR = "year",
}

export interface ISubscriptionFeature {
  id: string;
  name: string;
  description: string;
  planId: string;
}

export interface ISubscription {
  id: string;
  name: string;
  stripePriceId: string;
  stripeProductId: string;
  description: string;
  price: number;
  currency: CurrencyEnum;
  interval: IntervalEnum;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  features: ISubscriptionFeature[];
}
