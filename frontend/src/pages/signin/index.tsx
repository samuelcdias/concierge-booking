import React, { FormEvent, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';

import { FiUser, FiLock } from "react-icons/fi";
import { Container, Content } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import { login } from "../../services/auth";

const SigIn: React.FC = () => {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (!username || !password) {
            setError("Preencha username e senha para continuar!" );
          } else {
            try {
              const response = await api.post("/signin", { username: username, password: password});
              login(response.data);

              history.push("/home");
            } catch (err) {
              setError(
                  "Houve um problema com o login, verifique suas credenciais.");
            }
          }
    }
    return (
        <Container>
            <Content>
                <form onSubmit={handleSubmit}>
                    <h1> Faça seu login</h1>
                    <Input
                        icon={FiUser}
                        name="username"
                        className="input-username"
                        placeholder="username"
                        autoComplete="false"
                        onChange={event => setUsername(event.target.value)}
                    />

                    <Input
                        icon={FiLock}
                        name="password"
                        className="input-password"
                        type="password"
                        placeholder="senha"
                        onChange={event => setPassword(event.target.value)}
                    />

                    <Button type="submit" className="div-button"> Acessar </Button>
                </form>
            </Content>
        </Container>
    )
}

export default withRouter(SigIn);