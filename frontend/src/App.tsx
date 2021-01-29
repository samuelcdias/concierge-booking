import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { isLoggedIn } from './services/helpers'

import {Container, Row, Col} from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import Sidebar from './components/SideBar'
import Routes from './routes'

import { FiLogIn, FiUser } from 'react-icons/fi'
import GlobalStyle from './styles/global'

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Container fluid>
                    <Row>
                        <Header
                            title="Concierge"
                            icon={isLoggedIn() ? FiUser : FiLogIn}
                            auth={isLoggedIn() }
                        />
                    </Row>
                    <Row className="container-page-content">
                        <Col md={1}>
                            {isLoggedIn() ? <Sidebar /> : <Row> </Row>}
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
    )
}

export default App