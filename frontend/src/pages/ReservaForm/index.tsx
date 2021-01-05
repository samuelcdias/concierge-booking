import React, { FormEvent, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import ListGroup from 'react-bootstrap/ListGroup'
// eslint-disable-next-line
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import from "./styles.css";

import Button from "../../components/Button";
import Sidebar from "../../components/SideBar";
import Input from "../../components/Input";

import { Reserva, Quarto } from "./interface"

import { FormStyle } from "../Cliente/ClientForm/styles";


export default function ReservaForm() {
    const history = useHistory();

    const [error, setError] = useState('')
    const [dataInicial, setDataInicial] = useState(new Date());
    const [dataFinal, setDataFinal] = useState(new Date());
    const [forma_pagamento, setFormaPagamento] = useState('');
    const [tarifa, setTarifa] = useState();
    const [obs, setObs] = useState();
    const [quartos, setQuartos] = useState([{
        id: 0,
        descricao: "",
        tipo: ""
    }]);

    useEffect(() => {
        api.get('/reservasf', { params: { in: String(dataInicial.toJSON()).split('T')[0], out: String(dataFinal.toJSON()).split('T')[0]} })
            .then((response) => {
                setQuartos(response.data);
                console.log(dataFinal);
            })
            .catch((error) => {
                alert("Ocorreu um erro, tente novamente mais tarde!")
            })
    }, [dataFinal]);
    async function handlePeriod(){
        console.log(dataFinal)
        
        const dataReq = [String(dataInicial.toJSON()).split('T')[0], String(dataFinal.toJSON()).split('T')[0]];
        console.log(dataReq);
        const response = await api.get('/reservasf', { params: { in: dataReq[0], out: dataReq[1] } });

        setQuartos(response.data);
        console.log(quartos);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const today: Date = new Date();

        const reservaData: Reserva = {
            codigo: String(today.getFullYear()) + String(today.getMonth()) + String(today.getDate()) + 'RS' + String(today.getTime()),
            dt_entrada_reserva: dataInicial,
            dt_saida_reserva: dataFinal,
            hora_entrada: null,
            hora_saida: null,
            forma_pagamento: "",
            tarifa: 0,
            no_show: false,
            obs: ""   
        }

        try {
            await api.post("/reservas", reservaData);

            history.push("/reservas");
        } catch (err) {
            setError(
                "Houve um problema, verifique se os dados estão corretos.");
        }
    }

    return (
        <div id="page-create-user">
                <FormStyle className="create-user-form">
                        <legend>Nova reserva</legend>

                        <DatePicker
                            selected={dataInicial}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date: Date) => setDataInicial(date)}
                            selectsStart
                            minDate={new Date()}
                            startDate={dataInicial}
                            endDate={dataFinal}
                        />
                        <DatePicker
                            selected={dataFinal}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date: Date) => setDataFinal(date)}
                            selectsEnd
                            startDate={dataInicial}
                            endDate={dataFinal}
                            minDate={dataInicial}
                        />
                        
                        {quartos.map((quarto) => (
                        <ListGroup horizontal="md" className="my-2" key={quarto.id}>
                            <ListGroup.Item>This ListGroup</ListGroup.Item>
                            <ListGroup.Item>renders horizontally</ListGroup.Item>
                            <ListGroup.Item>on {quarto.descricao}</ListGroup.Item>
                            <ListGroup.Item>and above!</ListGroup.Item>
                        </ListGroup>
                        ))}

                        <Button type="submit">Cadastrar</Button>
                </FormStyle>
        </div>
    );
}
