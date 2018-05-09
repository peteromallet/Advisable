import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom'
import './reset.css.js';

import Navigation from './components/Navigation'
import View from './components/View'
import CandidateList from './components/CandidateList'

const Container = styled.div`
  display: flex;
`

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <Container>
        <Navigation>Testing</Navigation>
        <View>
          <CandidateList />
        </View>
      </Container>
    </BrowserRouter>,
    document.body.appendChild(document.createElement('div')),
  )
})
