import React,{ HTMLAttributes } from 'react'

import styled from 'styled-components';
import colors from '../../pages/styles/colors.json'

interface FooterProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}


export default function Footer({ children, title, ...props}: FooterProps) {
    return(
    <FooterStyle className="footer-content">
        <p>Desenvolvido por <strong>Samuel Cardoso</strong></p>
    </FooterStyle >
    )
}

const FooterStyle = styled.footer`
    position: relative;
    bottom: 0;
    height: 30px;
    padding: 4px;
    width:100%;

    p {
        position: relative;
        font-size: 70%;
        text-align: center;
        width: 100%;
        padding: 4px;
        margin: 0;
    }
    `;
