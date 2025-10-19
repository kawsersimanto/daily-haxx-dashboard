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
  currency: string;
  interval: "month" | "year";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  features: ISubscriptionFeature[];
}
