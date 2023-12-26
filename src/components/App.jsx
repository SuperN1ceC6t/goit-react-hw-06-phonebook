import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactsList/ContactList";
import { nanoid } from "nanoid";
import { Filter } from "./Filter/Filter";
import { Message } from "./Message/Message";
import { useState, useEffect } from "react";

export const App = () => {
  const [state, setState] = useState({
    contacts: [],
    filter: '',
  })

  const handleChange = ({target: {value, name}}) => {
    setState((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addContact(state)
  }

  const addContact = (data) => {
    const normalizedName = data.name.toLowerCase();
    const Contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    }
    if (
      state.contacts.find(
        contact => contact.name.toLowerCase() === normalizedName
      )
    ) {
      return alert(`${data.name} is already in contacts!`);
    }
    setState((prev) => {
      return {
        ...prev,
        contacts: [...prev.contacts, Contact]
      }
    })
  }

  const filterContacts = event => {
    const { value } = event.currentTarget;
    if (value !== null) {
    setState((prevState) => ({
      ...prevState,
      filter: value,
    }));
  }
  };

    const deleteContact = (contactId) => {
      setState(prevState => ({
      ...prevState,
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

    const getFilteredContacts = () => {
    const { filter, contacts } = state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    const localData = localStorage.getItem('data')
    if (localData && JSON.parse(localData).length > 0) {
      setState((prev) => ({
          ...prev,
          contacts: JSON.parse(localData),
        }))
    }
  }, [])

  useEffect(() => {
      localStorage.setItem('data', JSON.stringify(state.contacts));
  }, [state.contacts]);


    const filteredContacts = getFilteredContacts();
    return(
      <div>
        <h1>Phonebook</h1>
        <ContactForm handleChange={handleChange} handleSubmit={handleSubmit}/>
        <h2>Contacts</h2>
        { state.contacts.length !== 0 ? <>
          <Filter value={state.filter} filterContacts={filterContacts} />
          <ContactList contacts={filteredContacts} onDeleteButton={deleteContact} />
        </> : (<Message message="There are no contacts in your phonebook. Please add your first contact!" />)}
    </div>
  );
}

