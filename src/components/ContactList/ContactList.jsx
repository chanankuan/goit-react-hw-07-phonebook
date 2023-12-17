import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactItem from 'components/ContactItem/ContactItem';
import Filter from 'components/Filter/Filter';
import { Header, List, Section, Title } from './ContactList.styled';
import { selectContacts, selectVisibleContacts } from '../../redux/selectors';
import { fetchContacts } from '../../redux/contactsSlice';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filteredContacts = useSelector(selectVisibleContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    contacts.length > 0 && (
      <Section>
        <Filter />

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
    )
  );
};

export default ContactList;
