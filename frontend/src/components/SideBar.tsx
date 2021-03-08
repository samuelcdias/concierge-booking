import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { Container, Nav, Row } from 'react-bootstrap'

import styles from "../styles/components/sideBar.module.css"
import { UserContext } from '../context/UserContext'

export default function Sidebar() {
    const { auth, admin } = useContext(UserContext)

    return (<>
        {auth && (
            <Container>
                <Row className={styles.sideBar}>
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/customers/">Clientes</Nav.Link>
                        <Nav.Link as={NavLink} to="/rooms/">Quartos</Nav.Link>
                        {admin && <Nav.Link as={NavLink} to="/users/">Usuários</Nav.Link>}
                        <Nav.Link as={NavLink} to="/reservations/new">Reserva</Nav.Link>
                    </Nav>
                </Row>
            </Container>
        )}
    </>
    )
}

