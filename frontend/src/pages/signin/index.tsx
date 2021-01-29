import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { handleInputChange } from '../../services/helpers'

import { FiUser, FiLock } from "react-icons/fi"
import { Container, Content } from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'
import api from '../../services/api'
import { login } from '../../services/auth'

const SignIn: React.FC = () => {
    const history = useHistory()

    const [state, setState] = useState({
        username: '',
        password: ''
    })

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        handleInputChange(event, setState, state)
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const data = state
        try {
            const response = await api.post(`/signin`, data)
            login(response.data)
            history.push(`/rooms`)
        } catch (err) {
            alert("Houve um problema, verifique se os dados estão corretos.")
        }
    }

    return (
        <Container>
            <Content>
                <form onSubmit={handleSubmit}>
                    <h1> Faça seu login</h1>
                    <Input
                        icon={FiUser}
                        className="input-username"
                        placeholder="username"
                        autoComplete="false"
                        name="username"
                        value={state.username}
                        onChange={handleChange}
                    />

                    <Input
                        icon={FiLock}
                        className="input-password"
                        type="password"
                        placeholder="senha"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                    />

                    <Button type="submit" className="div-button"> Acessar </Button>
                </form>
            </Content>
        </Container>
    )
}

export default withRouter(SignIn);