import React, { FormEvent, useState } from "react";
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import Button from "../../components/Button";
import Sidebar from "../../components/SideBar";
import Input from "../../components/Input";


import { FiPlus } from "react-icons/fi";


export default function CreateUser() {
    const history = useHistory();

    const [error, setError] = useState('');
    const [nome, setNome] = useState('');

    interface reservaData {
        name: string,
    }

    function handlePeriod(){

    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const reservaData: reservaData = {
            name: nome,
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
                <form className="create-user-form">
                        <legend>Nova reserva</legend>

                        <Input
                            className="input-nome"
                            name="nome"
                            placeholder="Nome"
                            onChange={event => setNome(event.target.value)}
                        />
                        

                        <Button type="submit">Cadastrar</Button>
                </form>
        </div>
    );
}
