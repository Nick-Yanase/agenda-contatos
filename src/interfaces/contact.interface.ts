export interface Contact{
  id: string
  name: string
  email: string
  phone: string
  userId: string
}
 export interface ContactCreate { // para poder criar o contato
  name: string
  email: string
  phone: string
  userEmail: string
 }
 export interface contactCreateData { // para salvar os dados cirados
  name: string
  email: string
  phone: string
  userId: string
 }
export interface ContactRepository{
  create(data: contactCreateData ): Promise<Contact>
  findByEmailOrPhone(email: string, phone: string): Promise<Contact | null>
  findAllContacts(userId: string): Promise<Contact[]>
}
