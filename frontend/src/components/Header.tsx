import { HTMLAttributes, useContext } from "react";
import Link from "next/link";

import colors from "@styles/colors.json";
import Logo from "../assets/images/logo.jpeg";

import styles from "@styles/components/header.module.css";
import { FiLogIn, FiUser } from "react-icons/fi";

import { UserContext } from "@contexts/UserContext";

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  title: string;
}

export default function Header({ children, title }: HeaderProps) {
  const { auth, logoff, name } = useContext(UserContext);
  const Icon = auth ? FiUser : FiLogIn;

  return (
    <div className={styles.shadow}>
      <img
        className="logo content-img"
        src={Logo}
        alt="Bell logo"
        width="64"
        height="64"
        rounded
      />

      <span className={styles.title}>{title}</span>

      <div className={styles.userStatus}>
        <div className={styles.userLogo}>
          {Icon && (
            <Icon className="icon-header" size={24} color={colors.textColour} />
          )}
          <h1 className={styles.loginName}>
            {name}
            {children}
          </h1>
        </div>
        <div className={styles.userAction}>
          {auth && (
            <Link href="/" onClick={logoff}>
              sair
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
