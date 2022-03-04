import { contacts } from "../../../data/contacts";

export default function handler(req, res){
    const { contactId } = req.query

    if(req.method === 'GET'){
    const contact = contacts.find((contact) => contact.id === parseInt(contactId))
    res.status(200).json(contact)
    }else if (req.method === 'DELETE') {
        const deleteContact = contacts.find((contact) => contact.id === parseInt(contactId))

        const index = contacts.findIndex(
            contact => contact.id === parseInt(contactId)
        )
        contacts.splice(index, 1)

        res.status(200).json(deleteContact)
    }else if (req.method === 'PUT') {
        const updatedContact = req.body.newContact
        const deleteContact = contacts.find((contact) => updatedContact.id === parseInt(contactId))

        const index = contacts.findIndex(
            contact => updatedContact.id === parseInt(contactId)
        )
        contacts.splice(index, 1);
        contacts.splice(index, 0, updatedContact);

        res.status(200).json(updatedContact)
    }
}