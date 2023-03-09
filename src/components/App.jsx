import React, { Component } from "react";
import { ContactsForm } from "./ContactForm/ContactForm";
import { ContactsList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { Layout } from "./Layout";
import { GlobalStyles } from "./GlobalStyles";




export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }

  addContact = newContact => {
    const findName = newContact.name.toLowerCase();
    if (this.state.contacts.find(({ name }) => name.toLowerCase() === findName)) {
      alert(`${newContact.name} is already in contacts`);
      return
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact]
      }
    })
  }

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== contactId)
      }
    })
  }

  onFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilter = () => {
    const filter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };
  
  render() {
    const { getFilter, deleteContact, onFilter, addContact } = this;
    const filtredContacts = getFilter();
    return (
      <Layout>
        <GlobalStyles/>
        <h1>Phonebook</h1>
        <ContactsForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={onFilter} />
        <ContactsList contacts={filtredContacts} onDelete={deleteContact} />
      </Layout>
    )
  }
}