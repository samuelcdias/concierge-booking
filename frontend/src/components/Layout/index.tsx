import { NextComponentType } from "next"
import SignIn from "../SignIn"

import { Container } from "@components/index"
import Footer from "./Footer"
import Header from "./Header"
import Sidebar from "./SideBar"
import Notification from "@components/notifications"
import { UserProvider } from "@contexts/UserContext"

function withAuth<T>(Component: NextComponentType<T>) {
  const Auth = (props: T) => {
    // Login data added to props via redux-store (or use react context for example)
    const { isLoggedIn } = props

    // If user is not logged in, return login component
    if (!isLoggedIn) {
      return <SignIn />
    }

    // If user is logged in, return original component
    return <Component {...props} />
  }

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps
  }

  return Auth
}

function App({ children }) {
  return (
    <div className="App">
      <UserProvider>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row">
            <Header title="Concierge" />
          </div>
          <div className="flex flex-row container-page-content">
            <Notification />

            <div className="flex flex-col row-span-3">
              <Sidebar />
            </div>
            <main className="flex flex-col">{children}</main>
            <div className="flex flex-col row-span-3"></div>
          </div>
        </div>
        <Footer />
      </UserProvider>
    </div>
  )
}

export default withAuth(App)
