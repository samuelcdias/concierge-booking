import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import styled from 'styled-components';
import colors from '../../styles/colors.json'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({icon:Icon, ...rest}) => {
    return (
        <Container>
            {Icon &&<Icon size={23} color={colors.primary} />}
            <input {...rest} />
        </Container>
            
    );
}

const Container = styled.div`
    background: ${colors.background};
    border-radius: 6px;
    border: 2px solid ${colors.primary};
    padding: 16px;
    display: flex;

    & + div {
        margin-top: 8px;
    }
    input {
        background: transparent;
        border: 0;
        color: ${colors.primary};
        outline-width: 0;
        fill-opacity:0;
        flex: 1;
        padding: 1px;
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 25px;
        align-items: center;        
    }
    svg { 
        margin-right: 16px;
    }
    `;

export default Input;