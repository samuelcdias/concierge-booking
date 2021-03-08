
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { History } from 'history'

import { useDataFetch } from '../services/helpers'
import api from "../services/api"
import { RoutesContext } from "./RoutesContext"

interface ListTypeProps {
    handleEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    handleDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    state: any
}

export const ListContext = createContext({} as ListTypeProps)

export default function ListProvider({ children }: { children: ReactNode }) {
    const history = useHistory()
    const [state, setState] = useState({
        data: [{}],
        count: 0,
        limit: 10,
        hasData: false,
        dataConf: false
    })
    const { routeKey, params } = useContext(RoutesContext)

    useEffect(() => {
        async function CallData() {
            const data = await useDataFetch(`${routeKey}`)
            setState(data)
        }
        console.log(params)
        CallData()
        console.log('list')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeKey])

    function handleEditClick(event: React.MouseEvent<HTMLButtonElement>) {
        editClick(event, routeKey, history)
    }

    function handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
        deleteClick(event, routeKey, history)
    }

    return (
        <>
            <ListContext.Provider value={{
                handleDeleteClick: handleDeleteClick,
                handleEditClick: handleEditClick,
                state: state
            }}>
                {children}
            </ListContext.Provider>
        </>
    )
}

export function editClick(event: React.MouseEvent<HTMLButtonElement>, key: String, history: History) {
    const index = event.currentTarget.getAttribute('value');
    history.push(`/${key}/${index}`)
}

export function deleteClick(event: React.MouseEvent<HTMLButtonElement>, key: String, history: History) {
    async function deleteData() {
        const index = event.currentTarget.getAttribute('value')
        try {
            await api.delete(`/${key}/${index}`)
        } catch (error) {
            alert("Ocorreu um erro, tente novamente mais tarde!")
        }
    }
    deleteData()
    history.push(`/${key}`)
}