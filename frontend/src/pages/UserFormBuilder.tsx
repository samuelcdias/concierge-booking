import { Button, Form } from 'react-bootstrap'
import { FormEvent, useContext, useEffect } from "react"
import { useParams } from "react-router-dom";

import { enumParams, ParamsType } from "../services/initialStates";
import { FormContext } from "../context/FormContext";
import { RoutesContext } from "../context/RoutesContext";
import UserFormEntries from "../components/formsFields/UserFormEntries"

import "../styles/form.css"

export default function CustomerForm() {
    const {
        params,
        routeKey,
        setParams,
        setRouteKey,
    } = useContext(RoutesContext)
    const paramsProvided = useParams<ParamsType>()

    useEffect(() => {
        setRouteKey(enumParams.USERS)
        setParams(paramsProvided)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeKey, params])

    const { state, handleChange, handleSubmit } = useContext(FormContext)

    function handleChangeCheckPassword(event: FormEvent<HTMLFormElement>) {
        if (state.password !== state.confirmPassword) {
            alert('Senhas não concidem!')
        } else {
            handleSubmit(event)
        }
    }
    return (
        <div className="container">
            <Form onSubmit={handleChangeCheckPassword}>
                <legend> Cadastrar Usuários </legend>

                <UserFormEntries state={state} params={paramsProvided} handleChange={handleChange} />

                <Button type="submit">
                    Cadastrar
                </Button>
            </Form>
        </div>
    )
}

