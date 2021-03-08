import { Button, Form } from 'react-bootstrap'
import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom";

import { enumParams, ParamsType } from "../services/initialStates";
import { FormContext } from "../context/FormContext";
import { RoutesContext } from "../context/RoutesContext";
import RoomFormEntries from "../components/formsFields/RoomFormEntries"

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
        setRouteKey(enumParams.ROOMS)  
        setParams(paramsProvided)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeKey, params])
    
    const { state, handleChange, handleSubmit } = useContext(FormContext)

    return(
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <legend> Cadastrar Quartos </legend>
                
                <RoomFormEntries state={state} handleChange={handleChange} />
    
                <Button type="submit">
                    Cadastrar
                </Button>
            </Form>
        </div>
    )
}

