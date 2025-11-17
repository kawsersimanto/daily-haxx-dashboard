import { IUser } from "../user/user.interface";

export enum IPaymentStatus {
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export interface IPaymentRecord {
  id: string;
  amount: number;
  paymentMethodId: string;
  previousPlanId: string;
  paymentStatus: IPaymentStatus;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null;
  endDate: string;
  refundedAmount: number | null;
  subscriptionId: string;
  userId: string;
  planId: string;
  stripePriceId: string;
  stripeProductId: string;
  user: IUser;
}
