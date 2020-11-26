import React, { HTMLAttributes } from 'react'

import styled from 'styled-components';
import colors from '../../pages/styles/colors.json'

interface ContentProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode
  }

export default function Content({ children, ...props}: ContentProps) {
  return (
    <ContainerStyle className="app-container">
        {children}
    </ContainerStyle>
  );
}

const ContainerStyle = styled.main`
  height: calc(100vh - 30px);
  min-height: 500px;
  padding: 10px;
  padding-top: 80px;
  box-sizing: border-box;
  background: #FFFFFF;
  padding-botton: 30px;
  `;