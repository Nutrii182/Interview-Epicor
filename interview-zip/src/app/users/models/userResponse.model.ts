import { User } from "./user.model";

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}