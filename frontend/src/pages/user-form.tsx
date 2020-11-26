import React, { useState }  from 'react' //Função que

import Input from '../components/Input';

import '.styles/pages/user-form.css'
import { Link } from 'react-router-dom'
import api from '../services/api';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    admin: boolean;
}

const UserForm: React.FC = () => {
    const [nome, setNome] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    return (
        <form className="userForm">
            <Input
            id="nome"
            className="input-nome"
            textlabel="Nome"
            name="nome"
            placeholder="Insira seu nome"
            onChange={event => setNome(event.target.value)}
          />
        </form>
    )
}

export default UserForm;