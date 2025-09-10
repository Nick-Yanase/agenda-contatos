// parte 01 -  aqui tem todos os types necessarios para api

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string | null
  createdAt: Date;
  updatedAt: Date;
}

// tipos dos métodos
export interface UserCreate {
  name: string;
  email: string;
  phone?: string | null
}

//metodos do repository
export interface userRepository {
  create(data: UserCreate): Promise<User>; // uma promise para lidar com funções assíncronas e as informações de retorno são id, name e email <User>
  findByEmail(email: string): Promise<User | null>
  getAll(): Promise<User[]>
}
