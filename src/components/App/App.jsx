import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Filter } from 'components/Filter/Filter';
import { Container, Wrapper, Title } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import { selectVisibleContacts } from '../../redux/selectors';
import { fetchContacts } from '../../redux/contactsSlice';

const App = () => {
  const contacts = useSelector(selectVisibleContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <Title>Phonebook</Title>
      <Wrapper>
        <ContactForm />

        {contacts.length > 0 && (
          <>
            <Filter />
            <ContactList />
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default App;
