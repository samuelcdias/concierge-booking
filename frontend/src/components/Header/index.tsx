import React, { HTMLAttributes } from 'react'
import { getToken } from "../../services/auth";

import { Container,Row, Col, Image } from 'react-bootstrap'

import colors from '../../styles/colors.json'
import Logo from '../../assets/images/logo.jpeg'
import { IconBaseProps } from 'react-icons'

import './styles.css';

interface HeaderProps extends HTMLAttributes<HTMLElement> {
    children?: React.ReactNode,
    title: string,
    icon?: React.ComponentType<IconBaseProps>,
    auth: boolean
}

export default function Header({ children, icon: Icon, title, auth}: HeaderProps) {
    
    return (
        <Container className="shadow " fluid>
            <Row>
                <Col md={2} className="align-content-center">
                    <Image className="mx-auto d-block" src={Logo} alt="Bell logo" width="64" height="64" rounded/>
                </Col>
                <Col md={8} className="d-flex flex-wrap align-content-center">
                    <h1 className="title">{title}</h1>
                </Col>
                <Col md={2} className="d-flex flex-wrap align-content-center">
                    {Icon && <Icon className="icon-header" size={24} color={colors.textColour} />}
                    <h1 className='login-name'>{auth ? JSON.parse(getToken() || '{}').name : 'Login'}{children}</h1>
                </Col>
            </Row >
        </Container >
   
  );
}
