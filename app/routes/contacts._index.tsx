import { ActionFunction, ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData, useOutletContext } from "@remix-run/react";
import { Link, Outlet } from "@remix-run/react";
import { useState } from "react";
import './index.css'
import invariant from "tiny-invariant";
import { createEmptyContact, getContact, updateContact } from "~/mockData";

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    invariant(params.contactId, "Missing contactId param");
    const contact = await getContact(params.contactId);
    if (!contact) {
        throw new Response("Not Found", { status: 404 });
    }
    return json({ contact });
};

export default function contactsIndex() {
    const { contact } = useLoaderData<typeof loader>();
    return <div>
        <h3>Add new contact:</h3>
        <Form key={contact.id} id="contact-form" method="post">
            <p>
                <span>Name</span>
                <input
                    defaultValue={contact.name}
                    aria-label="First name"
                    name="name"
                    type="text"
                    placeholder="name"
                />
                <input
                    aria-label="city"
                    defaultValue={contact.city}
                    name="city"
                    placeholder="city"
                    type="text"
                />
            </p>
            <p>
                <button type="submit">Save</button>
            </p>
        </Form>

    </div>
}

export const action = async ({
    params,
    request,
}: ActionFunctionArgs) => {
    const contact = await createEmptyContact();

    invariant(params.contactId, "Missing contactId param");
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    return await updateContact(contact.contactId, updates);
};