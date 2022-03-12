import { ButtonHTMLAttributes } from "react"

import styles from "./button.module.css"

type ButtonProps = {
  children: React.ReactNode
  name: string
  width?: string
  height?: string
  padding?: boolean
  variant?: keyof typeof VariantMap
} & ButtonHTMLAttributes<HTMLButtonElement>

const VariantMap = {
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
}

export default function Button({
  children,
  width = "4.25rem",
  height = "1.875rem",
  padding = true,
  variant = "primary",
  name,
  ...props
}: ButtonProps) {
  const className = [styles.root, VariantMap[variant]]

  return (
    <div className={styles.customButton}>
      <button
        name={name}
        data-id={`button-${name.replace(" ", "-").toLowerCase()}`}
        className={className.join(" ")}
        style={{
          width: width,
          height: height,
          padding: padding ? "0 1rem" : "0",
        }}
        {...props}
      >
        {children}
      </button>
    </div>
  )
}
