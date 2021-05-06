import { useContext, useEffect } from "react"

import { RoutesContext } from "../context/RoutesContext";
import { Button, Form } from 'react-bootstrap'
import { enumParams, ParamsType } from "../services/initialStates";
import CustomerFormEntries from "../components/formsFields/CustomerFormEntries"
import { FormContext } from "../context/FormContext";
import { useParams } from "react-router-dom";

import "../styles/form.css"

export default function CustomerForm(){
    const {
        params,
        routeKey,
        setParams,
        setRouteKey,
    } = useContext(RoutesContext)
    const paramsProvided = useParams<ParamsType>()

    useEffect(() =>{
        setRouteKey(enumParams.CUSTOMERS)  
        setParams(paramsProvided)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeKey, params])
    const { state, stateProps, handleChange, handleSubmit } = useContext(FormContext)

    return(
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <legend> Cadastrar Clientes </legend>
                
                <CustomerFormEntries state={state} stateProps={stateProps} handleChange={handleChange} />
    
                <Button type="submit">
                    Cadastrar
                </Button>
            </Form>
        </div>
    )
}

