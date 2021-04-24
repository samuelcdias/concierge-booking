import { HTMLAttributes, useContext } from 'react'

import { Image, Nav } from 'react-bootstrap'

import colors from '../styles/colors.json'
import Logo from '../assets/images/logo.jpeg'

import styles from '../styles/components/header.module.css'
import { FiLogIn, FiUser } from 'react-icons/fi'

import { UserContext } from '../context/UserContext';
import { NavLink } from 'react-router-dom'


interface HeaderProps extends HTMLAttributes<HTMLElement> {
    children?: React.ReactNode,
    title: string,
}


export default function Header({ children, title }: HeaderProps) {
    const { auth, logoff, name } = useContext(UserContext)
    const Icon = auth ? FiUser : FiLogIn

    return (
        <div className={styles.shadow}>
            < Image className="logo" src={Logo} alt="Bell logo" width="64" height="64" rounded />

            <span className={styles.title}>{title}</span>

            <div className={styles.userStatus}>
                <div className={styles.userLogo}>
                    {Icon && <Icon className="icon-header" size={24} color={colors.textColour} />}
                    <h1 className={styles.loginName}>{name}{children}</h1>
                </div>
                <div className={styles.userAction}>
                    {auth && <Nav.Link as={NavLink} to="/" onClick={logoff}>sair</Nav.Link>}
                </div>
            </div>
        </div >
    );
}
