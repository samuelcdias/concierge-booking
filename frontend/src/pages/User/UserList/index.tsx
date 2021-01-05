import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';

import { Container, Row, Col, Table, Button  } from 'react-bootstrap'
import { FiPlus } from "react-icons/fi";

import colors from '../../styles/colors.json'
import './styles.css';

import { userData } from "../interface"

export default function ClientList() {
    const history = useHistory();
    const routeName = '/users';

    const [users, setUsers] = useState<userData>();
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        async function getEntitieList() {
            try {
                const { data } = await api.get(routeName);
                setUsers(data);
                console.log(users)
                setHasData(true);
            } catch (error) {
                alert("Ocorreu um erro, tente novamente mais tarde!")
            }
        }
        getEntitieList();
    }, []);

    function handleEditClick(event: React.MouseEvent<HTMLButtonElement>) {
        const index = event.currentTarget.getAttribute('value');
        history.push(`${routeName}/${index}`);
    }

    function handleRemoveClick(event: React.MouseEvent<HTMLButtonElement>) {
        async function removeEntitie() {
            const index = event.currentTarget.getAttribute('value');
            try {
                await api.delete(`${routeName}/${index}`);
            } catch (error) {
                alert("Ocorreu um erro, tente novamente mais tarde!")
            }
        }
        removeEntitie()
        history.push(routeName);
    }

    function List() {
        if (hasData) {
            return (<>
                <Table striped borderless hover size="sm" responsive="lg" >
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>username</th>
                            <th>admin?</th>
                            <th id="button"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users!.data.map((user) => (
                            <tr key={user.id}>
                                <td >{user.name}</td>
                                <td >{user.username}</td>
                                <td >{user.admin ? "Sim" : "Não"}</td>
                                <td >
                                    <Button
                                        type="button"
                                        value={user.id}
                                        onClick={handleEditClick}
                                    >editar</Button>{' '}
                                    <Button
                                        type="button"
                                        variant="danger"
                                        value={user.id}
                                        onClick={handleRemoveClick}
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
            <Container> 
                <Row>
                    <h1>Users</h1>
                </Row>
                <Row>
                    <Col sm={11}></Col>
                    <Col sm={1}>
                        <Button type="button" onClick={() => history.push(`/users/novo`)}>
                            <FiPlus size={23} color="#FFF" />
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <List />
                </Row>
            </Container>

    );
}

