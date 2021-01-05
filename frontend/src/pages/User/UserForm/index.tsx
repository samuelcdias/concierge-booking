import React, { FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../services/api';

import { Form } from "react-bootstrap";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { userInterface, userParams } from "../interface"

import './styles.css';
import styled from "styled-components";

const UserForm: React.FC = () => {
    const history = useHistory();

    const routeName = '/users';
    const params = useParams<userParams>();
    const [nome, setNome] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        async function getUserData() {
            try {
                const { data } = await api.get(`${routeName}/${params.id}`);
                setNome(data.name);
                setUsername(data.username);
                setEmail(data.email);
            } catch (error) {
                alert("Ocorreu um erro, tente novamente mais tarde!")
            }
        }
        if (params.id) {
            getUserData();
        }
    },[]);

    function checkPassword() {
        if (senha != confirmPassword) {
            setError('Senhas não concidem!')
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const userData: userInterface = {
            id: params.id ? params.id : undefined,
            name: nome,
            username: username,
            email: email,
            password: senha,
            confirmpassword: confirmPassword
        }

        try {
            await api.post(routeName, userData);

            history.push(`${routeName}/novo`);
        } catch (err) {
            setError(
                "Houve um problema, verifique se os dados estão corretos.");
        }
        alert('Cadastro realizado com sucesso!')
    }

    return (
        <FormStyle>
                <Form className="create-user-form" onSubmit={handleSubmit}>
                        <legend>Cadastrar usuário</legend>

                        <Input
                            className="input-nome"
                            name="nome"
                            placeholder="Nome"
                            value={nome}
                            onChange={event => setNome(event.target.value)}
                        />
                        <Input
                            className="input-email"
                            type="email"
                            name="email"
                            placeholder="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <Input
                            className="input-username"
                            name="username"
                            placeholder="username"
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                        />
                        <Input
                            className={`input-password ${params.id && 'hidethis'}`}
                            name="password"
                            type="password"
                            placeholder="Senha"
                            onChange={event => setSenha(event.target.value)}
                        />
                        <Input
                            className={`input-confirmpassword ${params.id && 'hidethis'}`}
                            name="confirmpassword"
                            type="password"
                            placeholder="Confirme a Senha"
                            onChange={event => {
                                setConfirmPassword(event.target.value)
                                checkPassword()
                            }}
                        />
                        <p id="error-text"></p>

                        <Button type="submit">Cadastrar</Button>
                </Form>
        </FormStyle>
    );
}

export default UserForm;

const FormStyle = styled.div`

  box-sizing: border-box;
  padding: 40px 30px;
  margin-top: 50px;
  margin: 0 auto;
  width: 100%;
  max-width: 350px;
  `