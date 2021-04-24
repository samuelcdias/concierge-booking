import { ButtonHTMLAttributes } from 'react'

import styles from "../styles/components/button.module.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  width?: string
  height?: string
  padding?: boolean
  variant?: string
}

export default function Button({ children, width = '4.25rem',
  height = '1.875rem', padding = true, variant = "primary",
  ...props }: ButtonProps) {
  return (
    <div className={styles.customButton}>
      <button style={{
        width: width,
        height: height,
        padding: padding ? "0 1rem" : "0",
        background: `var(--${variant})`
      }}{...props}>
        {children}
      </button>
    </div>
  )
}

