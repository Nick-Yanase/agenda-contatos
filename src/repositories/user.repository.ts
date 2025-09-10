// parte 02- lidar com as funções do prisma e operações com banco de dados

import { prisma } from "../database/prisma-client.js";
import type { User, UserCreate, userRepository } from "../interfaces/user.interface.js";

class UserRepositoryPrisma implements userRepository{ // aqui ele implementa a interface, então é obrigado a implementar todos os métodos dela, por isso que no arquivo user.usecase.ts, ele da auto complete após colocar this.userRepository.
  async create(data: UserCreate): Promise<User> {
      const result = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone 
        }
      })
      return result
  }

  async getAll(): Promise<User[]> {
      const result = await prisma.user.findMany()
      return result
  }

  async findByEmail(email: string): Promise<User | null>{
    const result = await prisma.user.findFirst({
      where:{
        email 
      } 
    })
    return result
  }
}

export {UserRepositoryPrisma}