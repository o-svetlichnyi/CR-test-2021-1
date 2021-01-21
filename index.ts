import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { passContactsToClients, addNewContact, deleteContact } from './actions';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

interface ContactsProps {
  contacts: Contact[];
}

const initContact = {
  name: '',
  phone: ''
};

const ContactsCount = ({ contacts = [] }: ContactsProps) => {
  return (
    <div className="awesome-contacts-count">
      <span>{contacts.length}</span>
    </div>
  );
};

const Contacts = ({ contacts = [] }: ContactsProps) => {
  const [newContact, setNewContact] = useState<{ name: string; phone: string }>(initContact);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(passContactsToClients(contacts));
  });

  const handleAddContact = () => {
    dispatch(addNewContact(newContact));
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div className="contact-wrapper">
      <ContactsCount contacts={contacts} />
      <div className="contacts">
        {contacts.length &&
          contacts
            .sort((a, b) => a.id - b.id)
            .map(({ name, phone, id }) => {
              return (
                <div>
                  <span>{name}</span>
                  <span>{phone}</span>
                  <div onClick={() => handleDeleteContact(id)}>Add contact</div>
                </div>
              );
            })}
      </div>
      <div className="new-contact">
        <input
          id="name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <label htmlFor="name">Name</label>
        <input
          id="phone"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <label htmlFor="phone">Phone</label>
        <div onClick={handleAddContact}>Add New Contact</div>
      </div>
    </div>
  );
};

export default Contacts;
