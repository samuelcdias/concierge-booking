import React from 'react' //Função que

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
  
    return (
        <form className="userForm">
            <label>
                Nome:
                <input type="text" placeholder="Nome" required name="name" />
            </label>
        </form>
    )
}

export default UserForm;