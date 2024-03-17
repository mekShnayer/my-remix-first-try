import { ActionFunction } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import { Link, Outlet } from "@remix-run/react";
import { useState } from "react";
import './index.css'
export default function contactsIndex() {
    const [contact, setContact] = useState({ name: "", city: "" })
    return <div>
        <h3>Add new contact:</h3>
        {/* <p>{contact.name},{contact.city}</p> */}
        <form onSubmit={(e) => addContact(contact)} className="form">
            <label>contact name:</label>
            <input type="text" name="name" value={contact.name} onChange={e => setContact({ name: e.target.value, city: contact.city })}></input>
            <label>city:</label>
            <input type="text" name="city" value={contact.city} onChange={e => setContact({ name: contact.name, city: e.target.value })}></input>
            <input type="submit" onClick={e => e.preventDefault()}></input>
        </form>
    </div>
}
const addContact = (contact) => {
    console.log(contact)
}