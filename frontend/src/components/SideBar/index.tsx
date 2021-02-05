import React from 'react'
import { NavLink } from 'react-router-dom'

import { Nav, Container, Row} from 'react-bootstrap'
import colors from '../../styles/colors.json'
import styled from 'styled-components'

export default function Sidebar() {

    return (
        <Container>
            <Row>
                <LinkDiv>
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/customers/">Clientes</Nav.Link>
                        <Nav.Link as={NavLink} to="/rooms/">Quartos</Nav.Link>
                        <Nav.Link as={NavLink} to="/users/">Usuários</Nav.Link>
                        <Nav.Link as={NavLink} to="/reservations/new">Reserva</Nav.Link>
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
        color:${colors.primary};
    }
    `