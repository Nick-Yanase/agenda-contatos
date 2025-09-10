/* parte 3 - 
aqui ele consegue resumir as funções do prisma colocando uma sintaxe simples onde :
this.userRepository.create({ name, email }) ->  faz referencia a essa função

async create(data: UserCreate): Promise<User> {
      const result = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
        }
      })
      return result
  }

e ainda consegue trazer todas as funções do UserRepository create, get

*/
import type { User, UserCreate, userRepository } from "../interfaces/user.interface.js";
import { UserRepositoryPrisma } from "../repositories/user.repository.js";

class UserUseCase{
  private userRepository: userRepository // somente a classe consegue usar esse atributo, e se não for instancia, não pode ser usado
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