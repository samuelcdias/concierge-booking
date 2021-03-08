import { ChangeEvent, createContext, FormEvent, ReactNode, useContext, useEffect, useState } from "react";
import { History } from 'history'
import { useHistory } from "react-router-dom";

import { useDataFetch } from '../services/helpers'
import { selectInitialState } from '../services/initialStates'

import api from "../services/api"
import { RoutesContext } from "./RoutesContext";

interface FormContextProps {
    state: any,
    stateProps: any
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void,
}

export const FormContext = createContext({} as FormContextProps)


export function FormProvider({ children }: { children: ReactNode }) {
    const history = useHistory()
    const { routeKey, params } = useContext(RoutesContext)

    const [state, setState] = useState(selectInitialState({ key: routeKey, params: params }))
    const [stateProps, setStateProps] = useState({
        hasData: false,
        dataConf: false
    })

    useEffect(() => {
        async function CallData() {

            const data = await useDataFetch(`${routeKey}/${params.id}`)
            setState(data.data)
            setStateProps({
                hasData: data.hasData,
                dataConf: data.dataConf
            })
        }
        if (params.id) {
            if (params.id !== 'new') {
                CallData()
                console.log('form')

            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeKey, params.id])

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        handleInputChange(event, setState, state)
    }

    async function handleSubmit(event: FormEvent) {
        handleSubmitClick(event, state, routeKey, history)
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

export async function handleSubmitClick(event: FormEvent, data: any, key: string, history: History) {
    event.preventDefault()
    try {
        await api.post(`/${key}`, data)

        alert('Cadastro realizado com sucesso!')
        history.push(`/${key}`)
    } catch (err) {
        alert("Houve um problema, verifique se os dados estão corretos.")
    }
}
