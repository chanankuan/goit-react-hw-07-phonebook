import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactItem from 'components/ContactItem/ContactItem';
import { Header, List, Section, Title } from './ContactList.styled';
import { selectVisibleContacts } from '../../redux/selectors';
import { fetchContacts } from '../../redux/contactsSlice';
import Filter from 'components/Filter/Filter';

const ContactList = () => {
  const contacts = useSelector(selectVisibleContacts);
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

        <Title>Contacts ({contacts.length})</Title>
        {contacts.length > 0 ? (
          <List>
            {contacts.map(contact => (
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
