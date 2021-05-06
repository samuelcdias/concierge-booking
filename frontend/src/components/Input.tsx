import React, { InputHTMLAttributes } from 'react';

import { IconBaseProps } from 'react-icons';
import colors from '../styles/colors.json'
import styles from '../styles/components/input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    className: string;
    textLabel?: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => {

    return (
        <div className={styles.container}>
            <label htmlFor={rest.id}>{rest.textLabel}</label>
            <div className={styles.iconInput}>
                {Icon && <Icon size={23} color={colors.primary} />}
                <input{...rest} />
            </div>
        </div>

    );
}



export default Input;