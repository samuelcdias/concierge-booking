import { createContext, ReactNode, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getToken, isAuthenticated, logout } from "../services/auth"

interface UserContextProps {
    auth: boolean
    name: string
    admin: boolean
    logoff: () => void
    setAuth: any
}

export const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useState<boolean>(isAuthenticated())
    const history = useHistory()
    const [name, setName] = useState<string>("Login")
    const [admin, setAdmin] = useState<boolean>(false)

    function validate(): boolean {
        try {
            const is_valid =
                JSON.parse(getToken() || "{}").exp > Math.floor(Date.now() / 1000)
            return is_valid
        } catch (err) {
            return false
        }
    }

    function logoff() {
        logout()
        setName("Login")
        setAuth(false)
        history.push("/")
    }

    useEffect(() => {
        setAuth(validate())
        if (!auth) {
            logoff()
        } else {
            setAdmin(JSON.parse(getToken() || '{}').admin)
            setName(JSON.parse(getToken() || '{}').name)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth])

    return (
        <div>
            <UserContext.Provider value={{
                auth,
                name,
                admin,
                logoff,
                setAuth
            }}>
                {children}
            </UserContext.Provider>
        </div>
    );
}
