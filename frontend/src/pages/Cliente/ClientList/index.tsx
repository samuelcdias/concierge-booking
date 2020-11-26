import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';

import Sidebar from "../../../components/SideBar";
import Button from "../../../components/Button";
import clienteData from "../interface"
import styled from 'styled-components';
import colors from '../../styles/colors.json'
import './styles.tsx';
import Table from "react-bootstrap/esm/Table";
import { IconBaseProps } from 'react-icons';
import { FiPlus } from "react-icons/fi";





export default function ClientList() {
    const history = useHistory();

    const [clientes, setClientes] = useState<clienteData>();
    const [dataConf, setDataConf] = useState();
    const [hasData, setHasData] = useState(false);
    const [nome, setNome] = useState('');
    const [dt_nascimento, setDtNascimento] = useState('');
    const [cpf, setCPF] = useState('');
    const [doc_num, setDocNum] = useState('');


    useEffect(() => {
        async function getdataConfigs() {
            try {
                const { data } = await api.get('/config');
                setDataConf(data);
            } catch (error) {
                alert("Ocorreu um erro, tente novamente mais tarde!")
            }
        }
        async function getClientesList() {
            try {
                const { data } = await api.get('/clientes');
                setClientes(data);
                setHasData(true);
            } catch (error) {
                alert("Ocorreu um erro, tente novamente mais tarde!")
            }
        }
        getdataConfigs();
        getClientesList();
    }, []);

    function handleEditClick(event:React.MouseEvent<HTMLButtonElement>) {
        const index = event.currentTarget.getAttribute('value');
        history.push(`/clientes/${index}`);
    }
    

    function List() {
        if (hasData) {
            return (<>
                <Table responsive="md" striped borderless hover >
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data de nascimento</th>
                            <th>CPF</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes!.data.map((cliente) => (
                            <tr key={cliente.id}>
                                <td >{cliente.nome}</td>
                                <td >{cliente.dt_nascimento}</td>
                                <td >{cliente.cpf}</td>
                                <td >
                                    <Button
                                        type="button"
                                        value={cliente.id} 
                                        onClick={handleEditClick}
                                    >editar</Button>
                                    <Button
                                        type="button"
                                        value={cliente.id}
                                    >excluir</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>)
        } else return (<div> <p>Nenhum dado encontrado</p></div>)
    }

    return (
        <div id="page-list-user">
            <div className="top-container">
                <Button type="button" ><FiPlus size={23} color={colors.second} /></Button>
            </div>
            
            <List />
        </div>
    );
}

