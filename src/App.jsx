import { useEffect, useState } from 'react'
import initionalContacts from './contactList.json';
import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import ContactForm from './ContactForm/ContactForm';
import './App.css';

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedPhoneBooks = window.localStorage.getItem('saved-phonebook');
    if (savedPhoneBooks !== null) {
      return JSON.parse(savedPhoneBooks);
    }
    return initionalContacts;
  });
  useEffect(() => {
    window.localStorage.setItem('saved-phonebook', JSON.stringify(contacts));
}, [contacts])

  const [filter, setFilter] = useState('');

  const normalize = str => str.replace(/\D/g, '');
  const isNumeric = Number.isFinite(Number(filter.trim()));
  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()) || ( isNumeric && normalize(contact.number).includes(normalize(filter))));

  const addContact = (newContact) => {
    setContacts((prev) => {
      return [...prev, newContact,];
    });
  };

  const deleteContact = (deleteId) => {
    setContacts((prev) => prev.filter(contact => contact.id !== deleteId));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onContact={addContact} />
      <SearchBox value={filter} onFilterChange={setFilter} /> 
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  )
}

export default App;
