
import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
    id?: string;
    name?: string;
    city?: string;
};

export type ContactRecord = ContactMutation & {
    id: string;
    createdAt: string;
};

const fakeContacts = {
    records: {} as Record<string, ContactRecord>,

    async getAll(): Promise<ContactRecord[]> {
        return Object.keys(fakeContacts.records)
            .map((key) => fakeContacts.records[key])
            .sort(sortBy("-createdAt", "last"));
    },

    async get(id: string): Promise<ContactRecord | null> {
        return fakeContacts.records[id] || null;
    },

    async create(values: ContactMutation): Promise<ContactRecord> {
        const id = values.id || Math.random().toString(36).substring(2, 9);
        const createdAt = new Date().toISOString();
        const newContact = { id, createdAt, ...values };
        fakeContacts.records[id] = newContact;
        return newContact;
    },

    async set(id: string, values: ContactMutation): Promise<ContactRecord> {
        const contact = await fakeContacts.get(id);
        invariant(contact, `No contact found for ${id}`);
        const updatedContact = { ...contact, ...values };
        fakeContacts.records[id] = updatedContact;
        return updatedContact;
    },

    destroy(id: string): null {
        delete fakeContacts.records[id];
        return null;
    },
};

export async function getContacts(query?: string | null) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    let contacts = await fakeContacts.getAll();
    if (query) {
        contacts = matchSorter(contacts, query, {
            keys: ["first", "last"],
        });
    }
    return contacts.sort(sortBy("last", "createdAt"));
}

export async function createEmptyContact() {
    const contact = await fakeContacts.create({});
    return contact;
}

export async function getContact(id: string) {
    return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
    const contact = await fakeContacts.get(id);
    if (!contact) {
        throw new Error(`No contact found for ${id}`);
    }
    await fakeContacts.set(id, { ...contact, ...updates });
    return contact;
}

export async function deleteContact(id: string) {
    fakeContacts.destroy(id);
}


[
    {
        "name": "Shani Mekaiten",
        "city": "Tel aviv"
    },
    {
        "name": "Gidi",
        "city": "Be'er Sheva"
    },
    {
        "name": "Tal",
        "city": "Hadera"
    },
    {
        "name": "Nir",
        "city": "Hertzelya"
    },
    {
        "name": "Another name",
        "city": "Netanya"
    },
    {
        "name": "Name",
        "city": "Tel aviv"
    },
    {
        "name": "Maayan",
        "city": "Kfar Yona"
    },
    {
        "name": "Limor",
        "city": "Hadera"
    },
    {
        "name": "Alon",
        "city": "Hertzelya"
    },
    {
        "name": "Roy",
        "city": "Netanya"
    },
    {
        "name": "Rachel",
        "city": "Be'er Sheva"
    },
    {
        "name": "Naama",
        "city": "Tel aviv"
    }
].forEach((contact) => {
    fakeContacts.create({
        ...contact,
        id: `${contact.name.toLowerCase()}-${contact.city.toLocaleLowerCase()}`,
    });
});
