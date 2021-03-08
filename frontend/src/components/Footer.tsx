import { HTMLAttributes } from 'react'

import styles from "../styles/components/footer.module.css"

interface FooterProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}


export default function Footer({ children, title, ...props}: FooterProps) {
    return(
        <footer className={styles.footerContent}>
            <p>Desenvolvido por <strong>Samuel Cardoso</strong></p>
        </footer >
    )
}
