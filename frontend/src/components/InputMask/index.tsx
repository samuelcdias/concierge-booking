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
    mask: string | Array<(string | RegExp)>;
    maskChar?: string;
    alwaysShowMask?: boolean;
    formatChars?: Record<string, string>;
    permanents?: number[];
}

const Input: React.FC<InputProps> = ({icon:Icon, ...rest}) => {
    const alwaysShowMask = false;
    rest.alwaysShowMask =  rest.alwaysShowMask == null ? rest.alwaysShowMask  : alwaysShowMask
    
    return (
        <Container>
            <label htmlFor={rest.id}>{rest.textlabel}</label>
            {Icon &&<Icon size={23} color={colors.primary} />}
            <InputMask {...rest} />
        </Container>
            
    );
}

const Container = styled.div`
    background: transparent
    padding: 16px;
    text-indent: 7px;
    display: flex;
    flex-direction: column;
    margin: 0;

    input {
        background: transparent;
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