export interface Contact{
  id: string
  name: string
  email: string
  phone: string
  userId?: string
}
 export interface ContactCreate {
  name: string
  email: string
  phone: string
  userEmail: string
 }
 export interface contactCreateData {
  name: string
  email: string
  phone: string
  userId: string
 }
export interface ContactRepository{
  create(data: contactCreateData ): Promise<Contact>
  findByEmailOrPhone(email: string, phone: string): Promise<Contact | null>
  findAllContacts(userId: string): Promise<Contact[]>
  update({id, name, email, phone}: Contact): Promise<Contact>
  delete(id: string): Promise<boolean>
}
