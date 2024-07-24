import { Space } from "./SpaceSchema";


export interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  spaces: Space[];
}