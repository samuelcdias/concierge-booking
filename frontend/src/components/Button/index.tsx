import React, { ButtonHTMLAttributes } from 'react';

import styled from 'styled-components';
import colors from '../../styles/colors.json'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <Container>
      <button className="primary-button" {...props}>
        {children}
      </button>
    </Container>
  );
}

const Container = styled.div`
    button {
      background: ${colors.primary};
      border-radius: 10px;
      border: none;
      padding: 0 16px;
      width: 100%;
      height: 56px;
      color: ${colors.colour};
      font-weight: bold;
      font-size: 20px;
      margin-top: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${colors.second};
      }
    }
    `;