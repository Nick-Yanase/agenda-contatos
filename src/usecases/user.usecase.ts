import type { User, UserCreate, userRepository } from "../interfaces/user.interface.js";
import { UserRepositoryPrisma } from "../repositories/user.repository.js";

class UserUseCase{
  private userRepository: userRepository
  constructor(){
    this.userRepository = new UserRepositoryPrisma()
  }

  async create({name, email, phone}: UserCreate): Promise<User>{
    const verifyIfUserExist = await this.userRepository.findByEmail(email)
    if (verifyIfUserExist){
      throw new Error("Este usuario já existe")
    }
    const result = await this.userRepository.create({ name, email, phone })
    return result
  }

  async getAllUsers(){
    const result = await this.userRepository.getAll()
    return result
  }
}

export {UserUseCase}