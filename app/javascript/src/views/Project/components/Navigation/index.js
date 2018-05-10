import React from 'react';
import logo from './logo.svg';
import Icon from 'src/components/Icon';
import { Nav, StatusList } from './styles';
import { NavLink, withRouter } from 'react-router-dom';

const Navigation = ({ match }) => (
  <Nav>
    <img src={logo} />
    <StatusList>
      <NavLink to={`${match.url}/applied`}>
        <Icon icon='inbox' />
        Applied
      </NavLink>
      <NavLink to={`${match.url}/introduced`}>
        <Icon icon='message-circle' />
        Introduced
      </NavLink>
      <NavLink to={`${match.url}/rejected`}>
        <Icon icon='trash-2' />
        Rejected
      </NavLink>
    </StatusList>
  </Nav>
)

export default withRouter(Navigation);
