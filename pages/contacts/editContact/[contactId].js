import { useState } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

function editContact({ contact } )  {
    
    const state = contact;    
    const router = useRouter()
    const [newContact, setContact] = useState()
    const contactId = router.query.contactId;
    //console.log(newContact);
    const submitContact = async (e) => {
        e.preventDefault()
        const response = await fetch(`/api/contacts/${newContact.id}`, {
            method: 'PUT',
            body: JSON.stringify({ newContact }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
       // console.log(newContact);
        const data = await response.json()
        console.log(data);
        router.push('/contacts')
    }

    return(
        <div className='container-fluid'>
        <div className='row'>
            <h2 className="text-center bg-dark text-white">CONTACT MANAGER</h2>
            </div>
        <div className="container">
        <div className="row" style={{padding: "35px"}}><div className="col-md-3"></div>
        <div className="col-md-6" style={{backgroundColor: "#012641", borderRadius: "10px 10px 10px 10px", color: "#ffffff", padding: "40px"}} key={contact.id}>
        <h4>
        <form onSubmit={ submitContact }>
                <input type='text' defaultValue={state.id} hidden />
                <label>Name:</label>
                <input type='text' className='form-control' defaultValue={contact.name} onChange={(e) => {state.name = e.target.value}} />
                <label>Mobile:</label>
                <input type='text' className='form-control' defaultValue={contact.mobile} onChange={(e) => {state.mobile = e.target.value}} />
                <label>Email:</label>
                <input type='text' className='form-control' defaultValue={contact.email} onChange={(e) => {state.email = e.target.value}} />
                <div className='text-center'>
                <button className='btn btn-primary m-2' onClick={(e) => setContact(state)}>Save</button>
                </div>
        </form>
        </h4></div>
        <div className="col-md-3"></div>
        </div>
        <div className='row'>
        <div className='text-center'>
        <Link href="/contacts" className="text-center"><button className="btn btn-primary m-4">Back To Contact List</button></Link>
        </div>    
        </div>
        </div>
        </div>
        
    )
}

export default editContact

export async function getStaticPaths(){

    const response = await fetch('http://localhost:3000/api/contacts')
    const contacts = await response.json()
    const paths = contacts.map(contact => ({
        params : { contactId: contact.id.toString() }
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps(context){
    console.log('Regenrating Data')
    const { params } = context
    const response = await fetch(`http://localhost:3000/api/contacts/${params.contactId}`)
    const data = await response.json()

        return {
            props: {
                contact: data,
            },
        }
}