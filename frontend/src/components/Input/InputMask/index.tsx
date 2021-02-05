import React, { InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';

import { IconBaseProps } from 'react-icons';
import { Container } from '../styles'
import colors from '../../../styles/colors.json'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    className: string;
    textlabel?: string;
    icon?: React.ComponentType<IconBaseProps>;
    mask: string | Array<(string | RegExp)>;
    maskChar?: string;
    maskPlaceholder?: string;
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
            <div className="icon-input">
                {Icon &&<Icon size={23} color={colors.primary} />}
                <InputMask {...rest} />
            </div>
        </Container>
            
    );
}

export default Input;