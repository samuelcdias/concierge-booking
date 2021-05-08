import { ChangeEvent, createContext, FormEvent, ReactNode, useContext, useEffect, useState } from "react";
import { History } from 'history'
import { useHistory } from "react-router-dom";

import { useDataFetch } from '../services/helpers'
import { enumParams, selectInitialState } from '../services/initialStates'

import api from "../services/api"
import { RoutesContext } from "./RoutesContext";
import { addNotification } from "../components/notifications";

interface FormContextProps {
    state: any,
    stateProps: any
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void,
}

export const FormContext = createContext({} as FormContextProps)


export function FormProvider({ children }: { children: ReactNode }) {
    const history = useHistory()
    const { routeKey, params, setIsOutdated } = useContext(RoutesContext)

    const [state, setState] = useState(selectInitialState({ key: routeKey, params: params }))
    const [stateProps, setStateProps] = useState({
        hasData: false,
        dataConf: false
    })

    async function CallData() {
        if (params.id === undefined) {
            params.id = routeKey === enumParams.ROOMS ? params.numero : "1"
        }

        const data = await useDataFetch(`${routeKey}/${params.id}`)
        setState(data.data)
        setStateProps({
            hasData: data.hasData,
            dataConf: data.dataConf
        })
    }

    useEffect(() => {
        if (params.id || params.numero) {
            if (params.id !== 'new' || params.numero !== 'new') {
                CallData()
            } else {
                setState(selectInitialState({ key: routeKey, params: {} }))
            }
        } else {
            setState(selectInitialState({ key: routeKey, params: {} }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeKey, params.id])

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        handleInputChange(event, setState, state)
    }

    async function handleSubmit(event: FormEvent) {
        handleSubmitClick(event, state, routeKey, history)
        setIsOutdated(true)
    }

    return (<>
        <FormContext.Provider value={{
            state: state,
            stateProps: stateProps,
            handleChange: handleChange,
            handleSubmit: handleSubmit
        }}>
            {children}
        </FormContext.Provider>
    </>)
}


export function handleInputChange(event: ChangeEvent<HTMLInputElement>, setState: any, state: any) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    setState({
        ...state,
        [name]: value
    })
}


export async function handleSubmitClick(event: FormEvent, data: any, routeKey: string, history: History) {
    event.preventDefault()
    try {
        await api.post(`/${routeKey}`, data)

        const msg = "Cadastro realizado com sucesso!"
        addNotification({ title: "Sucesso", message: msg, type: "success" })
        history.push(`/${routeKey}`)
    } catch (err) {
        const msg = "Houve um problema, verifique se os dados estão corretos."
        addNotification({ title: "Erro", message: msg, type: "warning" })
    }
}
