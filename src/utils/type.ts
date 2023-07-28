export type Token = {
  refresh: string;
  access: string;
}

export type Decoded = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
}

export type User = {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
  member_category: number;
  random_team: string;
  team_relation: string;
}

export type CompanyListResponse = {
  id: number;
  company_name: string;
  subdomain: string;
  company_creation_date?: string;
  subscription_activation_date?:string;
  subscription_inactive_date?:string;
  subscription_update_date?:string;
}