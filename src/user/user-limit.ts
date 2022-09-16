export enum LimitStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  FUTURE = 'FUTURE',
  IN_COOLDOWN = 'IN_COOLDOWN',
}

export enum LimitPeriod {
  CALENDAR_DAY = 'CALENDAR_DAY',
  CALENDAR_WEEK = 'CALENDAR_WEEK',
  CALENDAR_MONTH = 'CALENDAR_MONTH',
  DAY = 'DAY',
  INDEFINITE = 'INDEFINITE',
  INSTANCE = 'INSTANCE',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}

export enum LimitType {
  BALANCE = 'BALANCE',
  BET = 'BET',
  DEPOSIT = 'DEPOSIT',
  LOSS = 'LOSS',
  SESSION = 'SESSION',
}

export interface BaseUserLimitModel {
  brandId: string;
  currencyCode: string;
  createdAt?: number;
  nextResetTime?: number;
  userId: string;
  userLimitId: string;
}
interface UserLimitPeriodEventModel extends BaseUserLimitModel {
  period: LimitPeriod;
  type: LimitType;
}


export interface UserLimit extends UserLimitPeriodEventModel {
  activeFrom: number;
  activeUntil?: number;
  previousLimitValue?: string;
  progress?: string;
  status: LimitStatus;
  userId: string;
  value: string;
}

export interface UserLimitProgessChangedModel extends BaseUserLimitModel {
  amount: string;
  previousProgress: string;
  remainingAmount: string;
}

export interface UserLimitProcessReset extends UserLimitPeriodEventModel {
  resetAmount: string;
  resetPercentage: string;
  remainingAmount: string;
  unusedAmount: string;
}
