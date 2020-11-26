import React, { FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../services/api';

import Sidebar from "../../../components/SideBar";
import Input from "../../../components/Input";
import InputMask from "../../../components/Input/InputMask";
import Button from "../../../components/Button";
import { BlockContent, FormStyle, Content } from "./styles";

import clienteData from "./interface"

interface clienteParams {
    id: string;
}
export default function CreateClient() {
    const history = useHistory();

    const params = useParams<clienteParams>();
    const [dataConf, setDataConf] = useState(false);
    const [nome, setNome] = useState('');
    const [dt_nascimento, setDtNascimento] = useState('');
    const [cpf, setCPF] = useState('');
    const [doc_num, setDocNum] = useState('');

    useEffect(() => {
        async function getdataConfigs() {
            try {
                const { data } = await api.get('/config');
                setDataConf(data.useSNRHOs);
            } catch (error) {
                alert("Ocorreu um erro, tente novamente mais tarde!")
            }
        }
        async function getClientData() {
            try {
                const { data } = await api.get(`/clientes/${params.id}`);
                setNome(data.nome)
                setCPF(data.cpf)
                setDtNascimento(data.dt_nascimento)
            } catch (error) {
                alert("Ocorreu um erro, tente novamente mais tarde!")
            }
        }
        getdataConfigs();

        if (params.id){ 
            getClientData();
        }
    });
  
    async function handleSubmit(event: FormEvent) {
            event.preventDefault();

            const clientData: clienteData = {
                id: params.id ? params.id : null,
                nome: nome,
                dt_nascimento: dt_nascimento,
                cpf: cpf
            }


            await api.post('/clientes', clientData)


            alert('Cadastro realizado com sucesso!')
            history.push('/clientes');
        }

    return (
        <Content id="page-create-user">
            <FormStyle className="create-user-form" onSubmit={handleSubmit}>
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
                        placeholder="Data de nascimento"
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
                        <legend>  Documento</legend>
                        <div>
                            <Input
                                name="num_doc"
                                className="input-num-doc"
                                type="text"
                                placeholder="Número"
                                onChange={event => setDocNum(event.target.value)}
                            />
                            <Input
                                name="org_doc"
                                className="input-org-doc"
                                type="text"
                                placeholder="Org. exp."
                                onChange={event => setDocNum(event.target.value)}
                            />
                            <Input
                                name="tipo_doc"
                                className="input-tipo-doc"
                                type="text"
                                placeholder="Tipo"
                                onChange={event => setDocNum(event.target.value)}
                            />
                        </div>
                    </BlockContent>

                    <Button type="submit">Cadastrar</Button>
                </fieldset>
            </FormStyle>
        </Content>
    );
}

