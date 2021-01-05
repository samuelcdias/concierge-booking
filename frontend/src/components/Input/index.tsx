import React, { InputHTMLAttributes } from 'react';

import { IconBaseProps } from 'react-icons';
import colors from '../../pages/styles/colors.json'
import { Container } from './styles'

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
            <div className="icon-input">
                {Icon &&<Icon size={23} color={colors.primary} />}
                <input{...rest} />
            </div>
        </Container>
            
    );
}



export default Input;