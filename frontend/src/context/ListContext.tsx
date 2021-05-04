
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useHistory, useLocation } from 'react-router-dom'
import { History } from 'history'

import { useDataFetch } from '../services/helpers'
import api from "../services/api"
import { RoutesContext } from "./RoutesContext"
import { UserContext } from "./UserContext"

interface ListTypeProps {
    state: any,
    maxPages: number,
    handleEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    handleDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    handlePagination: (event: React.MouseEvent<HTMLButtonElement>) => void,
    setIsOutdated: any
}

export const ListContext = createContext({} as ListTypeProps)

export default function ListProvider({ children }: { children: ReactNode }) {
    const initialState = {
        data: [{}],
        count: 0,
        limit: 10,
        hasData: false,
        dataConf: false
    }
    const history = useHistory()
    const [state, setState] = useState(initialState)
    const [maxPages, setMaxPages] = useState<number>(1)

    const { routeKey,
        activePage,
        setActivePage,
        isOutdated,
        setIsOutdated
    } = useContext(RoutesContext)

    const { auth } = useContext(UserContext)

    async function CallData() {
        setState(initialState)
        const data = await useDataFetch(`${routeKey}/?page=${activePage}`)
        setState(data)
    }

    useEffect(() => {
        if (isOutdated && auth) {
            CallData()
            setIsOutdated(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeKey, activePage, isOutdated])
    useEffect(() => {
        if (state.hasData) {
            setMaxPages(Math.floor(state.count / state.limit) + 1)
        }
    }, [state])

    function handleEditClick(event: React.MouseEvent<HTMLButtonElement>) {
        editClick(event, routeKey, history)
    }

    function handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
        deleteClick(event, routeKey, history)
        setIsOutdated(true)
    }

    function handlePagination(event: React.MouseEvent<HTMLButtonElement>) {
        const pageNumber = Number(event.currentTarget.innerText)
        //history.push(`/${routeKey}?page=${pageNumber}`)
        setActivePage(pageNumber)
    }

    return (
        <>
            <ListContext.Provider value={{
                state: state,
                maxPages: maxPages,
                handleDeleteClick: handleDeleteClick,
                handleEditClick: handleEditClick,
                handlePagination: handlePagination,
                setIsOutdated: setIsOutdated
            }}>
                {children}
            </ListContext.Provider>
        </>
    )
}

export function editClick(event: React.MouseEvent<HTMLButtonElement>, routeKey: String, history: History) {
    const index = event.currentTarget.getAttribute('value');
    history.push(`/${routeKey}/${index}`)
}

export function deleteClick(event: React.MouseEvent<HTMLButtonElement>, routeKey: String, history: History) {
    async function deleteData() {
        const index = event.currentTarget.getAttribute('value')
        try {
            await api.delete(`/${routeKey}/${index}`)
        } catch (error) {
            alert("Ocorreu um erro, tente novamente mais tarde!")
        }
    }
    deleteData()
    history.push(`/${routeKey}`)
}

