export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string | null
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreate {
  name: string;
  email: string;
  phone?: string | null
}

export interface userRepository {
  create(data: UserCreate): Promise<User>; 
  findByEmail(email: string): Promise<User | null>
  getAll(): Promise<User[]>
}
