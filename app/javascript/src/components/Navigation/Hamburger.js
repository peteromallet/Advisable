import React from 'react';
import { HamburgerButton, HamburgerLine } from './styles';

export default ({ onClick }) => (
  <HamburgerButton onClick={onClick}>
    <HamburgerLine />
    <HamburgerLine />
    <HamburgerLine />
  </HamburgerButton>
)
