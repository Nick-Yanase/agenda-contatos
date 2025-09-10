import { fastify, type FastifyInstance } from "fastify";
import type { Contact, ContactCreate } from "../interfaces/contact.interface.js";
import { ContactUseCase } from "../usecases/contact.usecase.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

async function contactRoutes(fastify: FastifyInstance){
  const contactUseCase = new ContactUseCase()
  fastify.addHook("preHandler", authMiddleware) // agora todas as rotas de contact tem esse middleware que verifica se no headers tem um email de verificação
  fastify.post<{Body: ContactCreate}>("/", async (req, reply) => {
    const { name, email, phone } = req.body
    const emailUser = req.headers["email"]
      try{
        const data = await contactUseCase.create({
          name,
          email,
          phone,
          userEmail: emailUser
        })
        
        return reply.send(data)
      }catch(error){
        reply.send(error)
      }
  })
  
  fastify.get("/", async (req, reply) => {
    const emailUser = req.headers["email"]
    try{
      const data = await contactUseCase.listAllContacts(emailUser)
      reply.send(data)
    } catch (error) {
      reply.send(error)
    }
  })

  fastify.put<{ Body: Contact, Params: {id: string} }>("/:id", async (req, reply) => {
    const { id } = req.params
    const {name, email, phone} = req.body
    try{
      const data = await contactUseCase.updateContact({
        id, 
        name,
        email,
        phone
      })
      reply.send(data)
    }catch (error){
      reply.send(error)
    }
  })

  fastify.delete<{Params: {id: string}}>("/:id", async (req, reply) => {
    const { id } = req.params
    console.log(id)
    try{
      const data = await contactUseCase.deleteContact(id)
      reply.send(data)
    } catch(error){
      reply.send(error)
    }
  }) 
} 
export { contactRoutes }