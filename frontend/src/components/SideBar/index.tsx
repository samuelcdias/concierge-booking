import React from 'react';
import { NavLink } from 'react-router-dom';

import { Nav, Container, Row} from 'react-bootstrap'
import colors from '../../pages/styles/colors.json'
import styled from 'styled-components';

export default function Sidebar() {

    return (
        <Container>
            {/*<Row>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            </Row>*/}
            <Row>
                <LinkDiv>
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/clientes/">Clientes</Nav.Link>
                        <Nav.Link as={NavLink} to="/quartos/">Quartos</Nav.Link>
                        <Nav.Link as={NavLink} to="/users/">Usuários</Nav.Link>
                    </Nav>
                </LinkDiv>
            </Row>
        </Container>
    );
}

const LinkDiv = styled.div`
    div > a   {
        color:${colors.primary};
        margin-top: 15px;
        font-weight: bold;
    }
    div > a: hover {
        color:${colors.primary} 
    }
    `