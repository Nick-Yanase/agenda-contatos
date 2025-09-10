import { prisma } from "../database/prisma-client.js";
import type { Contact, ContactCreate, contactCreateData, ContactRepository } from "../interfaces/contact.interface.js";

class ContactRepositoryPrisma implements ContactRepository{
  async create(data: contactCreateData): Promise<Contact> {
      const result = await prisma.contacts.create({
        data:{
          name: data.name,
          email: data.email,
          phone: data.phone,
          userId: data.userId
        }
      })
      return result
  }
  async findByEmailOrPhone(email: string, phone: string): Promise<Contact | null> {
      const result = await prisma.contacts.findFirst({
        where:{
          OR:[
            {
              email,
            },
            {
              phone
            }
          ]
        }
      })
      return result || null
  }

  async findAllContacts(userId: string ){
    const result = await prisma.contacts.findMany({
      where:{
        userId
      }
    })
    return result
  }
}

export {ContactRepositoryPrisma}