import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { handleInputChange, handleSubmitClick } from '../../context/FormContext'

import api from '../../services/api'

// eslint-disable-next-line
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { ReservationForm } from "../../interfaces/ReservationInterfaces"

import { Button, ButtonGroup, Form, ToggleButton, Col, Row, Container } from "react-bootstrap"
import CustomerForm from "../../components/formsFields/CustomerBaseFields"
import { CustomerModel } from "../../interfaces/CustomerInterfaces"


export default function ReservaForm() {
    const key = 'reservations'
    const history = useHistory();
    const [today, setToday] = useState(new Date())
    const [dataInicial, setDataInicial] = useState(new Date())
    const [dataFinal, setDataFinal] = useState(new Date())
    const [hasData, setHasData] = useState(false)
    const [state, setState] = useState<ReservationForm>({
        reservation: {
            codigo: String(today.getFullYear()) + String(today.getMonth()) + String(today.getDate()) + 'RS' + String(today.getTime()),
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
            const dataReq = [String(dataInicial.toJSON()).split('T')[0], String(dataFinal.toJSON()).split('T')[0]];
            const response = await api.get('/reservations/available-rooms', { params: { in: dataReq[0], out: dataReq[1] } });

            setRooms(response.data)
            if (rooms.length > 0) {
                setHasData(true)
                console.log(rooms)
            }
        }
        if (dataFinal.toJSON().split('T')[0] !== today.toJSON().split('T')[0]) {
            handlePeriod()
        }
        setToday(new Date())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataFinal])


    async function handleSubmit(event: FormEvent) {
        setState({ ...state, customerList: [customer] })
        console.log(state)
        handleSubmitClick(event, state, key, history)
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        handleInputChange(event, setState, state)

    }
    function handleChangeCustomer(event: ChangeEvent<HTMLInputElement>) {
        handleInputChange(event, setCustomer, customer)

    }

    function List() {
        if (hasData) {
            return (<>
                <Form.Group className="justify-content-center">
                    <Form.Text className="text-muted">
                        Escolha o quarto
                    </Form.Text>
                    <ButtonGroup toggle vertical>
                        {rooms.map((room, idx) => (
                            <ToggleButton
                                key={idx}
                                type="radio"
                                variant="outline-primary"
                                name='roomSelected'
                                value={room.type_of_room}
                                checked={state.roomSelected === room.type_of_room}
                                onChange={handleChange}
                            >
                                {room.description}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Form.Group>
            </>)
        } else return (<></>)
    }

    return (
        <>
            <Container className="text-center align-content-center" >
                <Form onSubmit={handleSubmit}>
                    <legend>Nova reserva</legend>
                    <Row lg={4} md={2}>
                        <Col className="text-center" lg={{ span: 3, offset: 3 }}>

                            <DatePicker
                                selected={dataInicial}
                                dateFormat="dd/MM/yyyy"
                                selectsStart
                                minDate={new Date()}
                                startDate={dataInicial}
                                endDate={dataFinal}
                                onChange={(date: Date) => setDataInicial(date)}
                            />

                        </Col>

                        <Col className="text-center" lg={{ span: 3 }}>
                            <DatePicker
                                selected={dataFinal}
                                dateFormat="dd/MM/yyyy"
                                selectsEnd
                                startDate={dataInicial}
                                endDate={dataFinal}
                                minDate={dataInicial}
                                onChange={(date: Date) => setDataFinal(date)}
                            />
                        </Col>
                    </Row>

                    <List />

                    {(state.roomSelected !== "") &&
                        <Col lg={6} md={4} className="text-center align-content-center">
                            <CustomerForm handleChangeFunction={handleChangeCustomer} state={customer} />
                        </Col>
                    }

                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Container>
        </>
    )
}
