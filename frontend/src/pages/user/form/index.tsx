import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { useDataFetch, handleSubmitClick, handleInputChange} from '../../../services/helpers'

import { Form } from "react-bootstrap";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { UserModel, UserParams } from "../interface"

import './styles.css';
import styled from "styled-components";

const UserForm: React.FC = () => {
    const key = "rooms"
    const history = useHistory();

    const params = useParams<UserParams>();
    const [state, setState] = useState<UserModel>({
        id: params.id ? params.id : undefined,
        name: '',
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
      })
      const [data, setData] = useState({
        data: {},
        hasData: false,
        dataConf: false
    })     

    useEffect(() => { 
        async function CallData(){
           // return await useDataFetch(`${key}/${params.id}`, data, setData)
        }
        if (params.id){ 
            CallData()
        }
    },[params.id]);
  
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        handleInputChange(event,setState, state)
    }

    async function handleSubmit(event: FormEvent) {
        handleSubmitClick(event, state, key, history)
    }


    function checkPassword(event: ChangeEvent<HTMLInputElement>) {
        handleChange(event)
        if (state.password !== state.confirmpassword) {
            alert('Senhas não concidem!')
        }
    }

    return (
        <FormStyle>
                <Form className="create-user-form" onSubmit={handleSubmit}>
                        <legend>Cadastrar usuário</legend>

                        <Input
                            className="input-nome"
                            placeholder="Nome"
                            name="name"
                            value={state.name}
                            onChange={handleChange}
                        />
                        <Input
                            className="input-email"
                            type="email"
                            name="email"
                            placeholder="email"
                            value={state.email}
                            onChange={handleChange}
                        />
                        <Input
                            className="input-username"
                            placeholder="username"
                            name="username"
                            value={state.username}
                            onChange={handleChange}
                        />
                        <Input
                            className={`input-password ${params.id && 'hidethis'}`}
                            type="password"
                            placeholder="Senha"
                            name="password"
                            value={state.password}
                            onChange={handleChange}
                        />
                        <Input
                            className={`input-confirmpassword ${params.id && 'hidethis'}`}
                            name="confirmpassword"
                            type="password"
                            placeholder="Confirme a Senha"
                            onChange={checkPassword}
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