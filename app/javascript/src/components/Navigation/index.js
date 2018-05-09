import React from 'react';
import logo from './logo.svg';
import Icon from '../Icon';
import { Nav, StatusList } from './styles';
import { NavLink } from 'react-router-dom';

const Navigation = ( ) => (
  <Nav>
    <img src={logo} />
    <StatusList>
      <NavLink to={`/1`}>
        <Icon icon='inbox' />
        Applied
      </NavLink>
      <NavLink to={`/2`}>
        <Icon icon='message-circle' />
        Introduced
      </NavLink>
      <NavLink to={`/3`}>
        <Icon icon='user-check' />
        Offered
      </NavLink>
      <NavLink to={`/4`}>
        <Icon icon='trash-2' />
        Rejected
      </NavLink>
    </StatusList>
  </Nav>
)

export default Navigation
