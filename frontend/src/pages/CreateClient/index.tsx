import React, { FormEvent, useState } from "react";
import { useHistory } from 'react-router-dom';

import Sidebar from "../../components/SideBar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import api from '../../services/api';

export default function CreateClient() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [dtofbirth, setDtOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmit (event: FormEvent) {
    event.preventDefault();

    const data = new FormData();
    data.append('name', name);
    data.append('dtofbirth', dtofbirth);
    data.append('password', password);

    await api.post('users', data)
    

    alert('Cadastro realizado com sucesso!')
    history.push('/');
  }

  return (
    <div id="page-create-user">

      <main>
        <form className="create-user-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Cadastrar Cliente</legend>

              <Input 
                name="nome"
                placeholder="Nome"
                onChange={ event => setName(event.target.value)}
              />

              <Input 
                name="dtofbirth"
                placeholder="Data de nascimento"
                onChange={ event => setDtOfBirth(event.target.value)}
              />

              <Input
                name="password"
                type="password"
                placeholder="Senha"
                onChange={ event => setPassword(event.target.value)} 
              />

              <Input
                name="confirmpassword"
                type="password"
                placeholder="Confirme a senha"
                onChange={ event => setConfirmPassword(event.target.value)}
              />
              
              <Button type="submit">Cadastrar</Button>
          </fieldset>          
        </form>
      </main>
    </div>
  );
}
