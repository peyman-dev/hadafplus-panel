export type StatusType = "verified" | "pending" | "rejected";

export interface DomainType {
  id?: string;
  _id: string;
  key: string | number;
  createdDate?: string;
  domain: string;
  status: StatusType;
  isActive: boolean;
}

export interface DomainAddType {
  _id: string;
  createdDate: number;
  domain: string;
  status: StatusType;
  isActive: boolean;
}

export type SortsType =
  | "BY_ASC"
  | "BY_DESC"
  | "BY_STATUS"
  | "BY_ACTIVATION"
  | "DEFAULT_SORT";

export type ResponseType = {
  status: number;
  data: any;
  message?: any
};

export interface DomainUpdateType {
  id: string,
  domain?: string;
  isActive?: boolean;
  status?: StatusType
}
