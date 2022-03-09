import { useContext } from "react";

import { Nav } from "react-bootstrap";

import styles from "@styles/components/sideBar.module.css";
import { UserContext } from "@contexts/UserContext";
import Link from "next/link";

export default function Sidebar() {
  const { auth, admin } = useContext(UserContext);

  return (
    <>
      {auth && (
        <div className={styles.sideBar}>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Link href="/home">Home</Link>
            <Link href="/customers/">Clientes</Link>
            <Link href="/rooms/">Quartos</Link>
            {admin && <Link href="/users/">Usuários</Link>}
            <Link href="/reservations/">Reserva</Link>
          </Nav>
        </div>
      )}
    </>
  );
}
