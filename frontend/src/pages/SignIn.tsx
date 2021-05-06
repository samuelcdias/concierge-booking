import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'

import { FiUser, FiLock } from "react-icons/fi"
import Input from '../components/Input'
import Button from '../components/Button'
import styles from '../styles/signIn.module.css'


import api from '../services/api'
import { login } from '../services/auth'
import { handleInputChange } from '../context/FormContext'
import { UserContext } from '../context/UserContext'

function SignIn() {
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

        } catch (err) {
            alert("Houve um problema, verifique se os dados estão corretos.")
        }
        setAuth(true)
        history.push("/home")
    }

    return (
        <div className="container">
            <div className={styles.content}>
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

                    <Button
                        type="submit"
                        width="15.75rem"
                        height="3.5rem"
                    > Acessar </Button>
                </form>
            </div>
        </div>
    )
}

export default withRouter(SignIn);