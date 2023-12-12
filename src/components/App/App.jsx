import React from 'react';
import { useSelector } from 'react-redux';
import { Filter } from 'components/Filter/Filter';
import { Container, Wrapper, Title } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import { getContacts } from '../../redux/selectors';

const App = () => {
  const contacts = useSelector(getContacts);

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
