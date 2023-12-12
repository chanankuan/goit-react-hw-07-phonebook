import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteContact } from '../../redux/contactsSlice';
import {
  DeleteButton,
  DeleteIcon,
  Avatar,
  Character,
  Item,
  Name,
  Number,
} from './ContactItem.styled';

const ContactItem = ({ id, name, number, color, bgColor }) => {
  const dispatch = useDispatch();

  return (
    <Item>
      <Avatar color={color} bgColor={bgColor}>
        <Character>{name[0].toUpperCase()}</Character>
      </Avatar>
      <Name>{name}</Name>
      <Number>{number}</Number>
      <DeleteButton onClick={() => dispatch(deleteContact(id))}>
        <DeleteIcon />
      </DeleteButton>
    </Item>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};

export default ContactItem;
