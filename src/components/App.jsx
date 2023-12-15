import { Component } from "react"
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactsList/ContactList";
import { nanoid } from "nanoid";
import { Filter } from "./Filter/Filter";
import { Message } from "./Message/Message";

export class App extends Component {
  state = {
  contacts: [],
  filter: '',
}

  handleChange = ({target: {value, name}}) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.addContact(this.state)
  }

  addContact(data) {
    const normalizedName = data.name.toLowerCase();
    const Contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    }
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === normalizedName
      )
    ) {
      return alert(`${data.name} is already in contacts!`);
    }
    this.setState((prev) => { return { contacts: [...prev.contacts, Contact] } })
    console.log(this.state);
  }

    filterContacts = event => {
    this.setState({ filter: event.currentTarget.value });
  };

    deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

    getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const localData = localStorage.getItem('data')
    if (localData && JSON.parse(localData).length > 0) {
      this.setState({
          contacts: JSON.parse(localData),
        })
    }
  }

  componentDidUpdate(_, prevState) {
    if(prevState.contacts.length !== this.state.contacts.length) {localStorage.setItem('data', JSON.stringify(this.state.contacts))}
  }

  render() {
    const filteredContacts = this.getFilteredContacts();
    const { filterContacts, deleteContact, state } = this;
    return(
      <div>
        <h1>Phonebook</h1>
        <ContactForm handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        <h2>Contacts</h2>
        { state.contacts.length !== 0 ? <>
          <Filter value={this.state.filter} filterContacts={filterContacts} />
          <ContactList contacts={filteredContacts} onDeleteButton={deleteContact} />
        </> : (<Message message="There are no contacts in your phonebook. Please add your first contact!" />)}
    </div>
  );
  }
};
