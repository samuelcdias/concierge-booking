import React, { InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';

import { IconBaseProps } from 'react-icons';
import colors from '../styles/colors.json'
import styles from '../styles/components/input.module.css'


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    className: string;
    textLabel?: string;
    icon?: React.ComponentType<IconBaseProps>;
    mask: string | Array<(string | RegExp)>;
    maskChar?: string;
    maskplaceholder?: string;
    alwaysShowMask?: boolean;
    formatChars?: Record<string, string>;
    permanents?: number[];
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => {
    const alwaysShowMask = false;
    rest.alwaysShowMask = rest.alwaysShowMask == null ? rest.alwaysShowMask : alwaysShowMask

    return (
        <div className={styles.container}>
            <label htmlFor={rest.id}>{rest.textLabel}</label>
            <div className={styles.iconInput}>
                {Icon && <Icon size={23} color={colors.primary} />}
                <InputMask {...rest} />
            </div>
        </div>

    );
}

export default Input;