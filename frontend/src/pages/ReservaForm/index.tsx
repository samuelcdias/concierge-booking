import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { Form, Col, Container } from "react-bootstrap"

import { ReservationFormProps } from "../../interfaces/ReservationInterfaces"
import { CustomerModel } from "../../interfaces/CustomerInterfaces"

import api from '../../services/api'
import { handleInputChange, handleSubmitClick } from '../../context/FormContext'
import Button from "../../components/Button"
import CustomerForm from "../../components/formsFields/CustomerBaseFields"
import PickIntervalDate from "../../components/PickIntervalDate"
import RadioButtons from "../../components/RadioButtons"
import ShowImg from "../../components/ShowImg"

export default function ReservationForm() {
    const key = 'reservations'
    const history = useHistory();
    const [today, setToday] = useState(new Date())
    const [dataInicial, setDataInicial] = useState(new Date())
    const [dataFinal, setDataFinal] = useState(new Date())
    const [hasData, setHasData] = useState(false)
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
    const [customer, setCustomer] = useState<CustomerModel>({
        nome: '',
        cpf: '',
        dt_nascimento: '',
    })

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
    }, [dataInicial, dataFinal])


    async function handleSubmit(event: FormEvent) {
        setState({ ...state, customerList: [customer] })
        handleSubmitClick(event, state, key, history)
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        handleInputChange(event, setState, state)

    }
    function handleChangeCustomer(event: ChangeEvent<HTMLInputElement>) {
        handleInputChange(event, setCustomer, customer)

    }
    function handleChoiceClick(event: any) {
        console.log(event.target)
        setState({
            ...state,
            roomSelected: event.target.value
        })
    }

    return (
        <>
            <Container className="text-center align-content-center" >
                <Form onSubmit={handleSubmit}>
                    <legend>Nova reserva</legend>
                    <p className="text-muted">
                        Escolha um período de estadia
                    </p>

                    <PickIntervalDate
                        startDate={dataInicial}
                        endDate={dataFinal}
                        setStartDate={setDataInicial}
                        setEndDate={setDataFinal}
                    />

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

                    <Button
                        type="submit"
                        padding={false}
                        width="7rem"
                        height="2.5rem"
                    > Cadastrar</Button>
                </Form>
            </Container>
        </>
    )
}

function getDate(date: Date): string {
    return date.toJSON().split('T')[0]
}

function generateCodeByDate(date: Date): string {
    return String(date.getFullYear()) +
        String(date.getMonth()) +
        String(date.getDate()) + 'RS' +
        String(date.getTime())
}

