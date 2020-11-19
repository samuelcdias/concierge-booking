import React, { FormEvent, useState } from "react";
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';

import Sidebar from "../../../components/SideBar";
import Input from "../../../components/Input";
import InputMask from "../../../components/InputMask";
import Button from "../../../components/Button";

import styled from 'styled-components';
import colors from '../../../styles/colors.json'
import './styles.css';

export default function CreateClient() {
  const history = useHistory();

  async function dataConfigs() {
    const res = await api.get('/config')
    return  res
  }

  interface clienteData {
    nome: string,
    cpf: string,
    dt_nascimento: string,
    num_doc_identidade?: string,
    tipo_doc_identidade?: string,
    orgao_doc_identidade?: string,
    nacionalidade?: string,
    profissao?: string,
    dt_identidade?: string,
    genero?: string,
    cidade?: string,
    estado?: string,
    pais?: string,
    motivo_viagem?: 'Lazer - Férias' | 'Negócio' | 'Congresso - Feira' | 'Parentes - Amigos' | 'Estudos - Cursos' | 'Religião' | 'Saúde' | 'Compras' | 'Outro',
    meio_transporte?: 'Avião' | 'Automóvel' | 'Ônibus' | 'Moto'| 'Navio-Barco'| 'Trem'| 'Outro'
  }

  const [nome, setNome] = useState('');
  const [dt_nascimento, setDtNascimento] = useState('');
  const [cpf, setCPF] = useState(''); 
  const [doc_num, setDocNum] = useState('');

  
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const clientData: clienteData = {
      nome: nome,
      dt_nascimento: dt_nascimento,
      cpf: cpf 
    }

    
    await api.post('/clientes', clientData)


    alert('Cadastro realizado com sucesso!')
    history.push('/');
  }

  const dataConf = dataConfigs()
  console.log(dataConf)

  return (
    <div id="page-create-user">
      <form className="create-user-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Cadastrar Cliente</legend>

          <Input
            id="nome"
            className="input-nome"
            textlabel="Nome"
            name="nome"
            placeholder="Insira seu nome"
            onChange={event => setNome(event.target.value)}
          />

          <InputMask
            id="dt_nascimento"
            className="input-dt-nascimento"
            textlabel="Data de nascimento"
            name="dtofbirth"
            mask="99/99/9999"
            alwaysShowMask={true}
            placeholder="Insira sua data de nascimento"
            onChange={event => setDtNascimento(event.target.value)}
          />

          <InputMask
            id="cpf"
            className="input-cpf"
            textlabel="CPF"
            name="cpf"
            mask="999.999.999-99"
            alwaysShowMask={true}
            placeholder="CPF"
            onChange={event => setCPF(event.target.value)}
          />
          <BlockContent>
            <Input
              name="num_doc"
              className="input-num-doc"
              type="text"
              placeholder="Num. Documento"
              onChange={event => setDocNum(event.target.value)}
            />
            <Input
              name="org_doc"
              className="input-org-doc"
              type="text"
              placeholder="Orgão expedidor"
              onChange={event => setDocNum(event.target.value)}
            />
            <Input
              name="tipo_doc"
              className="input-tipo-doc"
              type="text"
              placeholder="Tipo de documento"
              onChange={event => setDocNum(event.target.value)}
            />
          </BlockContent>


          <Button type="submit">Cadastrar</Button>
        </fieldset>
      </form>
    </div>
  );
}

const BlockContent = styled.div`
  background: transparent;
  padding: 6px 0px;
  display: flex;
  flex-direction: row;
  align-content: center;
  visibility: ${'hidden'};
  width: ${0};
  height: ${0};

  div + div {
    margin: 0px 4px;
  }

  div {
    height: 42px;
    margin: 0px;
  }
  
`