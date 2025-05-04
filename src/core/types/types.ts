export type StatusType = "verified" | "pending" | "rejected";

export interface DomainType {
  createdDate: Date;
  domain: string;
  status: StatusType;
  isActive: boolean;
}
