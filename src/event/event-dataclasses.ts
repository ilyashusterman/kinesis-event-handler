import { LimitStatus, LimitType, LimitPeriod } from "../user/user-limit.js";

export interface EventPayload {
  activeFrom: number;
  brandId: string;
  currencyCode: string;
  status: LimitStatus,
  type: LimitType,
  period: LimitPeriod,
  value: string;
  userLimitId: string;
  userId: string;
}

export interface EventHandlerResult {
  status: string
}

export enum EventType {
  USER_LIMIT_CREATED = 'USER_LIMIT_CREATED',
  USER_LIMIT_PROGRESS_CHANGED = 'USER_LIMIT_PROGRESS_CHANGED',
  USER_LIMIT_RESET = 'USER_LIMIT_RESET',
}

export interface RawEvent<T> {
  [Key: string]: T;
}