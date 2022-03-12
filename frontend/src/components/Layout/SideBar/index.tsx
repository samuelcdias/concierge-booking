import { useContext } from "react"

import { UserContext } from "@contexts/UserContext"
import Link from "next/link"
import styles from "./side-bar.module.css"

export default function Sidebar() {
  const { auth, admin } = useContext(UserContext)

  return (
    <>
      {auth && (
        <div className="root">
          <nav className="flex flex-col">
            <Link href="/home" passHref>
              <a className={styles.link}>Home</a>
            </Link>
            <Link href="/customers/" passHref>
              <a className={styles.link}>Clientes</a>
            </Link>
            <Link href="/rooms/" passHref>
              <a className={styles.link}>Quartos</a>
            </Link>
            {admin && (
              <Link href="/users/" passHref>
                <a className={styles.link}>Usuários</a>
              </Link>
            )}
            <Link href="/reservations/" passHref>
              <a className={styles.link}>Reserva</a>
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
