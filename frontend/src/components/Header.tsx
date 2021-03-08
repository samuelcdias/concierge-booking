import { HTMLAttributes, useContext } from 'react'

import { Container, Row, Col, Image } from 'react-bootstrap'

import colors from '../styles/colors.json'
import Logo from '../assets/images/logo.jpeg'

import '../styles/components/header.css'
import { FiLogIn, FiUser } from 'react-icons/fi'

import { UserContext } from '../context/UserContext';

interface HeaderProps extends HTMLAttributes<HTMLElement> {
    children?: React.ReactNode,
    title: string,
}

export default function Header({ children, title }: HeaderProps) {
    const { auth, logoff, name } = useContext(UserContext)
    const Icon = auth ? FiUser : FiLogIn

    return (
        <Container className="shadow " fluid>
            <Row>
                <Col md={2} className="align-content-center">
                    <Image className="mx-auto d-block" src={Logo} alt="Bell logo" width="64" height="64" rounded />
                </Col>
                <Col md={8} className="d-flex flex-wrap align-content-center">
                    <h1 className="title">{title}</h1>
                </Col>
                <Col md={2} className="d-flex flex-wrap align-content-center">
                    {Icon && <Icon className="icon-header" size={24} color={colors.textColour} />}
                    <h1 className='login-name'>{name}{children}</h1>
                    {auth && <button onClick={logoff}> sair </button>}
                </Col>
            </Row >
        </Container >

    );
}
