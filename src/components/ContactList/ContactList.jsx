import React from 'react';
import { useSelector } from 'react-redux';
import ContactItem from 'components/ContactItem/ContactItem';
import { Header, List, Section, Title } from './ContactList.styled';
import { getContacts, getFilter } from '../../redux/selectors';

const getFilteredContacts = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const filteredContacts = getFilteredContacts(contacts, filter);

  return (
    <Section>
      <Header>
        <p>Name</p>
        <p></p>
        <p>Phone Number</p>
        <p></p>
      </Header>

      <hr style={{ margin: '20px 0' }}></hr>

      <Title>Contacts ({filteredContacts.length})</Title>
      {filteredContacts.length > 0 ? (
        <List>
          {filteredContacts.map(contact => (
            <ContactItem key={contact.id} {...contact} />
          ))}
        </List>
      ) : (
        <h2>Contacts not found</h2>
      )}
    </Section>
  );
};

export default ContactList;
