import { useState } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

function addContact()  {
    
    const state = {id: Date.now(),name: '', mobile:'', email:''};    
    const router = useRouter()
    const [contact, setContact] = useState()
    //console.log(contact);
    const submitContact = async (e) => {
        e.preventDefault()
        //console.log(contact);
        const response = await fetch('/api/contacts', {
            method: 'POST',
            body: JSON.stringify({ contact }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //console.log(contact);
        const data = await response.json()
        console.log(data);
        if( data !== ""){
            alert('Contact saved sucessfully')
        }
        router.push('/contacts')
        
    }

    return(
        <div className='container-fluid'>
        <div className='row'>
            <h2 className="text-center bg-dark text-white">CONTACT MANAGER</h2>
            </div>
        <div className="container">
        <div className="row" style={{padding: "35px"}}><div className="col-md-3"></div>
        <div className="col-md-6" style={{backgroundColor: "#012641", borderRadius: "10px 10px 10px 10px", color: "#ffffff", padding: "40px"}}>
        <div> 
            <form onSubmit={submitContact}>
                <input type='text' defaultValue={state.id} hidden />
                <label>Name:</label>
                <input type='text' className='form-control' defaultValue={state.name} onChange={(e) => {state.name = e.target.value}} />
                <label>Mobile:</label>
                <input type='number' className='form-control' defaultValue={state.mobile} onChange={(e) => {state.mobile = e.target.value}} />
                <label>Email:</label>
                <input type='email' className='form-control' defaultValue={state.email} onChange={(e) => {state.email = e.target.value}} />
                <div className='text-center'>
                <button className='btn btn-primary m-2' onClick={(e) => setContact(state)}>Save</button>
                </div>
            </form>
        </div>    
        </div>
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

export default addContact