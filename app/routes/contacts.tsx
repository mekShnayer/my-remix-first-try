import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { Navbar } from "~/components/Navbar";
import { getContact, getContacts } from '../mockData'
import './index.css';
import { Header } from "~/components/Header";
import invariant from "tiny-invariant";
export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    console.log(params)
    invariant(params.contactId, "Missing contactId param");
    const contacts = await getContacts();

    return json({ contacts });
};
export default function Contacts() {

    const contacts: { name: string; city: string }[] = useLoaderData()

    return (
        <div>
            <Header />
            <Navbar />
            <div className="page-content">
                <div className="font-24 bold align-center">contacts </div>
                <div className="contacts-container">
                    {contacts.map(contact =>
                        <div className="contact">
                            <div className="bold">{contact.name}</div>
                            <div>{contact.city}</div>
                        </div>)}
                </div>
                <Outlet />
            </div>
        </div>
    );
}
