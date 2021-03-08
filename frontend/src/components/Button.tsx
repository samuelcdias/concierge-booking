import { ButtonHTMLAttributes } from 'react'

import styles from "../styles/components/button.module.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  width?: string
  height?: string

}

export default function Button({ children, width = '4.25rem', height = '1.875rem', ...props }: ButtonProps) {
  return (
    <div className={styles.customButton}>
      <button style={{ width: width, height: height }}{...props}>
        {children}
      </button>
    </div>
  )
}

