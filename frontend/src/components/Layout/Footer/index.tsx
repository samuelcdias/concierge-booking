import { HTMLAttributes } from "react"

import styles from "./footer.module.css"

interface FooterProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export default function Footer({ children, title, ...props }: FooterProps) {
  return (
    <footer className={styles.root}>
      <p className={styles.__text}>
        Desenvolvido por <strong>Samuel Cardoso</strong>
      </p>
    </footer>
  )
}
