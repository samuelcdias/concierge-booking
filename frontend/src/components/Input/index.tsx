import React, { InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';

import { IconBaseProps } from 'react-icons';
import styled from 'styled-components';
import colors from '../../styles/colors.json'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    className: string;
    textlabel?: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({icon:Icon, ...rest}) => {
    
    return (
        <Container>
            <label htmlFor={rest.id}>{rest.textlabel}</label>
            {Icon &&<Icon size={23} color={colors.primary} />}
            <input{...rest} />
        </Container>
            
    );
}

const Container = styled.div`
    background: transparent
    padding: 16px;
    text-indent: 7px;
    display: flex;
    flex-direction: row;
    align-items: center;

    & + div {
        margin-top: 8px;
    }

    input {
        background: transp  arent;
        border-radius: 6px;
        border: 2px solid ${colors.primary};
        color: ${colors.primary};
        outline-width: 0;
        fill-opacity:0;
        flex: 1;
        margin: 6px 0px;
        text-indent: 3px;
        padding: 2px;
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