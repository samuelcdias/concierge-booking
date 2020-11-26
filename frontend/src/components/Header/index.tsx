import React, { HTMLAttributes } from 'react'


import styled from 'styled-components';
import colors from '../../pages/styles/colors.json'
import Logo from '../../assets/images/logo.jpeg';
import { IconBaseProps } from 'react-icons';

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  title: string
  icon?: React.ComponentType<IconBaseProps>;
  nomeUsuario?: string
}


export default function Header({ children, icon: Icon, title, ...props }: HeaderProps) {
  return (
    <HeaderStyle className="header-content mat-elevation-z5">
      <img src={Logo} alt="Bell logo" />

      <h1>{title}</h1>
      <div className="login-container">
        {Icon && <Icon className="icon-header" size={28} color={colors.textColour} />}
        {props.nomeUsuario}
      </div>


    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    background:${colors.background};
    background-color: ${colors.background};
    
    -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
    -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
    box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);

    h1 {
        position: absolute;
        display: block;
        text-align: center;
        margin: 0 auto;
        left: 42%;
        font-family: Nunito;
        font-style: normal;
        font-weight: 900;
        font-size: 36px;
        line-height: 49px;
        letter-spacing: 0.12em;
    }

    img {
        position: absolute;
        width: 80px;
        height: 60px;
        border-radius: 6px;
        border: 1px;
        margin: 5px;
        left: 5%;
        top: 0;
    }

    .login-container{
        position: absolute;
        right: 5%;
    }
    `;