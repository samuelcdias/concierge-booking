import React from "react";

import Button from "../../components/Button";
import Sidebar from "../../components/SideBar";

import './styles.css';
import { FiPlus } from "react-icons/fi";
import Input from "../../components/Input";

export default function CreateUser() {
  return (
    <div id="page-create-user">

      <main>
        <form className="create-user-form">
          <fieldset>
            <legend>Cadastrar usuário</legend>

              <Input name="nome" placeholder="Nome" />
              <Input name="username" placeholder="username" />
              <Input name="password" type="password" placeholder="Senha"  />
              <Input name="confirmpassword" type="password" placeholder="Confirme Senha"  />

              <Button type="submit">Cadastrar</Button>
          </fieldset>          
        </form>
      </main>
    </div>
  );
}
