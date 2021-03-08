import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { handleInputChange } from '../../context/FormContext'

import { FiUser, FiLock } from "react-icons/fi"
import { Container, Content } from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'
import api from '../../services/api'
import { login } from '../../services/auth'
import { UserContext } from '../../context/UserContext'

const SignIn: React.FC = () => {
    const history = useHistory()
    const { setAuth } = useContext(UserContext)

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
            const response = await api.post("/signin", data)
            login(response.data)
            setAuth(true)
            history.push("/home")
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

                    <Button type="submit" > Acessar </Button>
                </form>
            </Content>
        </Container>
    )
}

export default withRouter(SignIn);