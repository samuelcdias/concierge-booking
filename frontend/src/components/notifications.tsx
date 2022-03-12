import { Store, ReactNotifications } from "react-notifications-component"

import "react-notifications-component/dist/theme.css"

function Notification() {
  return <ReactNotifications />
}

type addNotificationProps = {
  title: string
  message: string
  type?: "success" | "danger" | "info" | "default" | "warning"
}

export function addNotification({
  title,
  message,
  type,
}: addNotificationProps) {
  return Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    width: 350,
    dismiss: {
      duration: 3000,
      pauseOnHover: true,
      onScreen: true,
    },
  })
}

export default Notification
