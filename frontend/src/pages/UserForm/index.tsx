import React, { FormEvent, useState } from "react";
import { useHistory } from 'react-router-dom';
import api from '../../services/api';


import Button from "../../components/Button";
import Sidebar from "../../components/SideBar";
import Input from "../../components/Input";

import './styles.css';
import { FiPlus } from "react-icons/fi";


export default function CreateUser() {
    const history = useHistory();

    const [nome, setNome] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    interface userData {
        name: string,
        email: string,
        username: string,
        password: string,
        confirmpassword: string
    }

    function checkPassword() {
        if (senha != confirmPassword) {
            setError('Senhas não concidem!')
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const userData: userData = {
            name: nome,
            username: username,
            email: email,
            password: senha,
            confirmpassword: confirmPassword
        }

        try {
            await api.post("/users", userData);

            history.push("/client/new");
        } catch (err) {
            setError(
                "Houve um problema, verifique se os dados estão corretos.");
        }
    }

    return (
        <div id="page-create-user">
                <form className="create-user-form">
                        <legend>Cadastrar usuário</legend>

                        <Input
                            className="input-nome"
                            name="nome"
                            placeholder="Nome"
                            onChange={event => setNome(event.target.value)}
                        />
                        <Input
                            className="input-email"
                            type="email"
                            name="email"
                            placeholder="email"
                            onChange={event => setNome(event.target.value)}
                        />
                        <Input
                            className="input-username"
                            name="username"
                            placeholder="username"
                            onChange={event => setNome(event.target.value)}
                        />
                        <Input
                            className="input-password"
                            name="password"
                            type="password"
                            placeholder="Senha"
                            onChange={event => setNome(event.target.value)}
                        />
                        <Input
                            className="input-confirmpassword"
                            name="confirmpassword"
                            type="password"
                            placeholder="Confirme a Senha"
                            onChange={event => {
                                setNome(event.target.value)
                                checkPassword()
                            }}
                        />
                        <p id="error-text"></p>

                        <Button type="submit">Cadastrar</Button>
                </form>
        </div>
    );
}
