import { HTMLAttributes, useContext } from "react"
import Link from "next/link"
import Image from "next/image"

import colors from "@styles/colors.json"
import Logo from "@assets/images/logo.jpeg"

import styles from "@styles/components/header.module.css"
import { FiLogIn, FiUser } from "react-icons/fi"

import { UserContext } from "@contexts/UserContext"

type HeaderProps = {
  title: string
} & HTMLAttributes<HTMLElement>

export default function Header({ children, title }: HeaderProps) {
  const { auth, logoff, name } = useContext(UserContext)
  const Icon = auth ? FiUser : FiLogIn

  return (
    <header className={styles.shadow}>
      <Image
        className="mx-auto p-1"
        src={Logo}
        alt="Bell logo"
        width="64"
        height="64"
      />

      <span className={styles.title}>{title}</span>

      <div className={styles.userStatus}>
        <div className={styles.userLogo}>
          {Icon && <Icon size={24} color={colors.text} />}
          <h1 className={styles.loginName}>
            {name}
            {children}
          </h1>
        </div>
        <div>
          {auth && (
            <Link href="/" passHref>
              <a className="p-0" onClick={logoff}>
                sair
              </a>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
