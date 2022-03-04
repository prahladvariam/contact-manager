import { useRouter } from 'next/router';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

function ContactDetail({ contact } )  {
    const router = useRouter()
    //const contactId = router.query.contactId
  // console.log(contacts);
    return(
        <div className='container-fluid'>
        <div className='row'>
            <h2 className="text-center bg-dark text-white">CONTACT MANAGER</h2>
            </div>
        <div className="container">
        <div className="row" style={{padding: "35px"}}><div className="col-md-3"></div>
        <div className="col-md-6" style={{backgroundColor: "#012641", borderRadius: "10px 10px 10px 10px", color: "#ffffff", padding: "40px"}} key={contact.id}>
        <h4>
            <table className='table table-borderless' style={{color: "white"}} >
            <tr>
            <td>Name :</td><td> {contact.name}</td>   
            </tr>
            <tr>
                <td>Mobile: </td><td>{contact.mobile}</td>
            </tr>
            <tr>
                <td>Email: </td><td>{contact.email}</td>
            </tr>
            </table>
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

export default ContactDetail

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
