import React from 'react';

import Container from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import Routes from './routes';
import { isAuthenticated } from "./services/auth";

import GlobalStyle from './pages/styles/global'
import {FiLogIn, FiUser  }from 'react-icons/fi'


export default function App() {
    return (
      <div className="App">
          <Header title="Concierge" icon={isAuthenticated() ? FiUser : FiLogIn}/>
          <Container>
            <Routes />
          </Container>
          <Footer />
          <GlobalStyle />

      </div>
    );
  }