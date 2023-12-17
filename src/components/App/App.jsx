import { useSelector } from 'react-redux';
import { Container, Wrapper, Title, StyledLoader } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import { selectIsFetchInProgress } from '../../redux/selectors';
import Loader from 'components/Loader/Loader';

const App = () => {
  const isLoading = useSelector(selectIsFetchInProgress);

  return (
    <Container>
      <Title>Phonebook</Title>
      <Wrapper>
        <ContactForm />

        {isLoading && (
          <StyledLoader>
            <Loader width={60} />
          </StyledLoader>
        )}

        <ContactList />
      </Wrapper>
    </Container>
  );
};

export default App;
