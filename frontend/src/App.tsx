import React from 'react';
import { getToken, isAuthenticated, logout } from "./services/auth";
import { BrowserRouter, Link } from 'react-router-dom';

import {Container, Row, Col} from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import Routes from './routes';

import GlobalStyle from './pages/styles/global'
import { FiLogIn, FiUser } from 'react-icons/fi'

export default function App() {

    return (
        <div className="App">
            <BrowserRouter>     
                <Container fluid>
                    <Row >
                        <Header 
                            title="Concierge"
                            icon={isAuthenticated() ? FiUser : FiLogIn}
                            nomeUsuario={isAuthenticated() ? JSON.parse(getToken()!).name : 'Login'}
                        />
                    </Row>
                    <Row className="container-page-content">
                        <Col md={1}>
                            <Sidebar />
                        </Col>
                        <Col>
                            <Routes />
                        </Col>
                        <Col md={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Footer />
                    </Row>
                </Container>
            </BrowserRouter>
            <GlobalStyle />
        </div>
    );
}
