import { useState,  useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import user from "../images/user.svg";
import deleted from  "../images/deleted.svg";
import edit from "../images/edit.svg";

function ContactPage({ contactsList }) {

    const [contacts, setContacts] = useState(contactsList)
    const [selectTerm, setSelectTerm] = useState("");
    //const [selectResult, setSelectResult] = useState([]);
    const [searchTerm,  setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(contactsList);
    const inputE1 = useRef("");

    const deleteContact = async contactId => {
        console.log(contactId);
        const response = await fetch(`/api/contacts/${contactId}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log(data);
        location.reload();
    }

    const searchHandler = (e) => {
        searchTerm = e.target.value
        setSearchTerm(searchTerm)
        console.log(searchTerm);
        if(searchTerm !== ""){
          const newContactList = contacts.filter((contact) => {
            return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
          });
          console.log( newContactList );
          setContacts(newContactList);
        } else {
          setContacts(searchResults);
        }
    };

   
    const selectHandler = selectTerm => {
          setSelectTerm(selectTerm);
          const types = {
            name: 'name',
            email: 'email',
            mobile: 'mobile'
          }
          const sortProperty = types[selectTerm];
          const sortedContactList = [...contacts].sort((a, b) => a[sortProperty] > b[sortProperty] ? 1 : -1)
          setContacts(sortedContactList)
    };
    

    return (
        <div className='container-fluid'>
            <div className='row'>
            <h2 className="text-center bg-dark text-white">CONTACT MANAGER</h2>
            </div>
            <div className='container'>
            <div className="row">
            <div style={{"float": "left", "width": "50%"}}>
              <h2>
                 Contact List
              </h2>    
             </div>  
            <div style={{"float": "right", "width": "50%"}}>
                <Link href={`/contacts/addContact`}><button className='btn btn-primary m-2 float-end'>Add Contact</button></Link>   
            </div>  
            </div>
            <div className='row'>
            <div style={{float: "left", width: "20%"}}>
            <input className="form-control m-2" ref={inputE1} defaultValue={searchTerm} onChange={searchHandler} type="text" placeholder="Search Contacts" />
            </div>
            <div style={{float: "none", width: "20%"}}>
            <button className="btn btn-primary m-2">Search</button>
            </div>
            <div style={{float: "right", width: "60%"}}>
            <h2 className="float-end">  
            <select  onChange={(e) => selectHandler(e.target.value)} className="form-select m-2 float-end">
                    <option defaultValue>Sort</option>
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                </select>
            </h2>
            </div>
            </div>
            <div className='row'>
            <div >

            {
                contacts.map(contact => {
                    return (
                        <div className='row m-4' key={contact.id}>
                        <div className="col-auto" style={{maxWidth: "60%", width: "100%"}}>
                        <Link href={`/contacts/${contact.id}`}><a style={{textDecoration: "none", color: "black"}}><div className='m-2' style={{ float: "left" }}><Image className="img-thumbnail" width={30} height={30} src={user} alt="user" /></div>{contact.name}<br />{contact.email}</a></Link>
                        </div>
                        <div className="col-auto" style={{maxWidth: "40%", width: "100%"}}>
                        <div className="float-end">
                        <Link href={`/contacts/editContact/${contact.id}`}><button className='btn'><Image className="img-thumbnail" width={30} height={20} src={edit} alt="Update" /></button></Link>
                        <button onClick={() => deleteContact(contact.id)} className='btn'><Image className="img-thumbnail" width={30} height={20} src={deleted} alt="delete" /></button>
                        </div>
                        </div>
                    </div>
                )
            })}
            </div>
            </div>
            </div>
        </div>
    )
}

export default ContactPage

export async function getStaticProps(){
    const response = await fetch('http://localhost:3000/api/contacts')
    const data = await response.json()

    return {
        props: {
            contactsList: data,
        },
    }
}