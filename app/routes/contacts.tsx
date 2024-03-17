import { LoaderFunction, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { Navbar } from "~/components/Navbar";
import mockData from '../mockData/mockData.json'
import './index.css';
import { Header } from "~/components/Header";
export let loader: LoaderFunction = async ({ request }) => {
    return mockData;
}

export default function Contacts() {

    const contacts: { name: string; city: string }[] = useLoaderData().contacts

    return (
        <div>
            <Header />
            <Navbar />
            <div className="page-content">
                <div className="font-24 bold align-center">contacts </div>
                <div className="contacts-container">
                    {contacts.map(contact => <div className="contact"><div className="bold">{contact.name}</div><div>{contact.city}</div></div>)}
                </div>
                <Outlet />
            </div>
        </div>
    );
}
