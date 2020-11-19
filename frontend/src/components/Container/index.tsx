import React, { HTMLAttributes } from 'react'

import styled from 'styled-components';
import colors from '../../styles/colors.json'

interface ContainerProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode
  }

export default function Container({ children, ...props}: ContainerProps) {
  return (
    <ContainerStyle className="app-container">
        {children}
    </ContainerStyle>
  );
}

const ContainerStyle = styled.main`
    height: calc(100vh - 34px - 50px - 64px);
    }
    `;