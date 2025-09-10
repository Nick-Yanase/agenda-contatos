import type { Contact, ContactCreate, ContactRepository } from "../interfaces/contact.interface.js";
import type { userRepository } from "../interfaces/user.interface.js";
import { ContactRepositoryPrisma } from "../repositories/contact.repository.js";
import { UserRepositoryPrisma } from "../repositories/user.repository.js";

class ContactUseCase{
  private contactRepository: ContactRepository
  private userRepository: userRepository
  constructor(){
    this.contactRepository = new ContactRepositoryPrisma
    this.userRepository = new UserRepositoryPrisma
  }

  async create({name, phone, email, userEmail}: ContactCreate){
    // email do usuario logado
    // buscar o usuario pelo email
    //se não exisitir, retorna erro
    //se existir, validar se ele já existe pelo telefone ou email
    // criar o contato

    const user = await this.userRepository.findByEmail(userEmail)
    
    if(!user){
      throw new Error("Usuário não encontrado!")
    }

    const contactToBeRegister = await this.userRepository.findByEmail(email)

    if(!contactToBeRegister){
      throw new Error("Este usuario não esta cadastrado!")
    }
    const verifyIfExistsContact = await this.contactRepository.findByEmailOrPhone(name, phone)
    if(verifyIfExistsContact){
      throw new Error("Contato já existe")
    }
    const contact = await this.contactRepository.create({
      name,
      email,
      phone,
      userId: user.id
     })
     return contact
  }

  async listAllContacts(userEmail: string){
    const user = await this.userRepository.findByEmail(userEmail)
    if (!user) {
      throw new Error("Usuário não encontrado!")
    }

    const contacts = this.contactRepository.findAllContacts(user.id)

    return contacts
  }

  async updateContact({id, name, email, phone}: Contact){
    const data = await this.contactRepository.update({id, name, email, phone})

    return data
  }

  async deleteContact(id: string): Promise<boolean> {
    const data = this.contactRepository.delete(id)

    return data
  }

}
export { ContactUseCase }