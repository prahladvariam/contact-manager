import { contacts } from "../../../data/contacts";
import React, { useState } from 'react';


export default async function handler(req, res){
    if(req.method === 'GET'){   
    res.status(200).json(contacts)
    }else if (req.method === 'POST'){
        const newContact = req.body.contact

        contacts.push(newContact)
        res.status(201).json(newContact)
    }
}
