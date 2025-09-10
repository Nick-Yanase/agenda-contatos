import type { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase.js";
import type { UserCreate } from "../interfaces/user.interface.js";
async function userRoutes(fastify: FastifyInstance){
  const userUseCase = new UserUseCase() // parte 05 - ao instanciar essa classe conseguimos usar o create direto da classe, simplficando muito os códigos e a routes acaba virando a controller 

  fastify.post<{Body: UserCreate}>("/", async (req, reply) => {
    const {name, email, phone} = req.body
    try{
      const data = await userUseCase.create({
        name,
        email,
        phone
      })
      return reply.send(data)
    }catch(error){
      reply.send(error)
    }
  })
}

export {userRoutes}