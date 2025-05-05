export type StatusType = "verified" | "pending" | "rejected";

export interface DomainType {
  key: string | number,
  createdDate: Date;
  domain: string;
  status: StatusType;
  isActive: boolean;
}

export type OrderType = "BY_ASC" | "BY_DESC" | "BY_STATUS" | "BY_ACTIVATION" | "DEFAULT_SORT"