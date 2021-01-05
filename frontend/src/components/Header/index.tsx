import React, { HTMLAttributes } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import styled from 'styled-components'
import colors from '../../pages/styles/colors.json'
import Logo from '../../assets/images/logo.jpeg'
import { IconBaseProps } from 'react-icons'

import './styles.css';

interface HeaderProps extends HTMLAttributes<HTMLElement> {
    children?: React.ReactNode
    title: string
    icon?: React.ComponentType<IconBaseProps>;
    nomeUsuario?: string
}

export default function Header({ children, icon: Icon, title, ...props }: HeaderProps) {
    return (
        <Container className="shadow " fluid>
            <Row>
                <Col md={2} className="align-content-center">
                    <Image className="mx-auto d-block" src={Logo} alt="Bell logo" width="64" height="64" rounded/>
                </Col>
                <Col md={8} className="d-flex flex-wrap align-content-center">
                    <Title>{title}</Title>
                </Col>
                <Col md={2} className="d-flex flex-wrap align-content-center">
                    {Icon && <Icon className="icon-header" size={24} color={colors.textColour} />}
                    <Login>{props.nomeUsuario}{children}</Login>
                </Col>
            </Row >
        </Container >
   
  );
}

const Title = styled.h1`
    font-family: Nunito;
    font-style: normal;
    font-weight: 900;
    font-size: 36px;
    line-height: 49px;
    letter-spacing: 0.12em;
`
const Login = styled.h1`
    margin-left: 8px;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 18px;
`   