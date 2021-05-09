import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { Form, Col } from "react-bootstrap"

import { ReservationFormProps } from "../interfaces/ReservationInterfaces"
import { CustomerModel } from "../interfaces/CustomerInterfaces"

import api from '../services/api'
import { handleInputChange, handleSubmitClick } from '../context/FormContext'
import Button from "../components/Button"
import CustomerForm from "../components/formsFields/CustomerBaseFields"
import PickIntervalDate from "../components/PickIntervalDate"
import RadioButtons from "../components/RadioButtons"
import ShowImg from "../components/ShowImg"
import FormGroup from "../components/FormGroup"

export default function ReservationForm() {
    const key = 'reservations'
    const history = useHistory();
    const [today, setToday] = useState(new Date())
    const [dataInicial, setDataInicial] = useState(new Date())
    const [dataFinal, setDataFinal] = useState(new Date())
    const [hasData, setHasData] = useState(false)
    const [status, setStatus] = useState<number>(0)
    const [state, setState] = useState<ReservationFormProps>({
        reservation: {
            codigo: generateCodeByDate(today),
            dt_entrada_reserva: dataInicial,
            dt_saida_reserva: dataFinal,
            hora_entrada: null,
            hora_saida: null,
            forma_pagamento: "CC",
            tarifa: 100,
            no_show: false,
            obs: ""
        },
        roomSelected: "",
        customerList: [{
            nome: "",
            cpf: "",
            dt_nascimento: ""
        }]
    })
    const [rooms, setRooms] = useState([{
        type_of_room: "",
        description: "",
        image_url: ""
    }])
    const [customer, setCustomer] = useState<CustomerModel>(state.customerList[0])

    useEffect(() => {
        async function handlePeriod() {
            const dataReq = [String(getDate(dataInicial)),
            String(getDate(dataFinal))];

            const response = await api
                .get('/reservations/available-rooms',
                    { params: { in: dataReq[0], out: dataReq[1] } });

            setRooms(response.data)
            if (rooms.length > 0) {
                setHasData(true)
            }
        }
        if (getDate(dataFinal) !== getDate(today)) {
            handlePeriod()
            if (status < 1) setStatus(1)
        }
        setToday(new Date())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataFinal])

    useEffect(() => {
        const reservation = state.reservation
        reservation.dt_entrada_reserva = dataInicial
        reservation.dt_saida_reserva = dataFinal
        setState({
            ...state,
            reservation: reservation
        })
        // eslint-disable-next-line
    }, [dataInicial, dataFinal])



    async function handleSubmit(event: FormEvent) {
        setState({ ...state, customerList: [customer] })
        handleSubmitClick(event, state, key, history)
    }

    function handleChangeCustomer(event: ChangeEvent<HTMLInputElement>) {
        handleInputChange(event, setCustomer, customer)
        if (status < 3) setStatus(3)
    }
    function handleChoiceClick(event: any) {
        setState({
            ...state,
            roomSelected: event.target.value
        })
        if (status < 2) setStatus(2)
    }

    return (
        <>
            <div>
                <Form onSubmit={handleSubmit}>
                    <legend>Nova reserva</legend>

                    <FormGroup
                        text="Escolha um período de estadia"
                    >
                        <PickIntervalDate
                            startDate={dataInicial}
                            endDate={dataFinal}
                            setStartDate={setDataInicial}
                            setEndDate={setDataFinal}
                        />
                    </FormGroup>


                    <RadioButtons
                        hasData={hasData}
                        state={state}
                        rooms={rooms}
                        handleChange={handleChoiceClick}
                    />

                    <ShowImg
                        condition={state.roomSelected}
                        listOf={rooms}
                        selected={state.roomSelected}
                    />

                    {(state.roomSelected !== "") &&

                        <Col lg={6} md={4} className="customerForm">
                            <CustomerForm
                                handleChangeFunction={handleChangeCustomer}
                                state={customer} />
                        </Col>
                    }

                    {(status === 3) && <Button
                        type="button"
                        padding={false}
                        width="7rem"
                        height="2.5rem"
                        onClick={handleSubmit}
                    > Cadastrar</Button>
                    }
                </Form>
            </div>
        </>
    )
}

function getDate(date: Date): string {
    return date.toJSON().split('T')[0]
}

function generateCodeByDate(date: Date): string {
    return String(date.getFullYear()) +
        String(date.getMonth() + 1) +
        String(date.getUTCDate()) + "RS" +
        String(date.getUTCHours()) +
        String(date.getUTCMinutes()) + "HR" +
        String(date.getMilliseconds())
}