import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { deleteClick, editClick, useDataFetch } from "../../../services/helpers";

import { Container, Row, Col, Table, Button  } from 'react-bootstrap'
import { FiPlus } from "react-icons/fi";

import './styles.css';

import { UserFetch, UserModel } from "../interface"

export default function List() {
    const key = 'users'
    const history = useHistory()
    const [users, setUsers] = useState<UserFetch>({
        data: { 
            data: [],
            count: 0,
            limit: 10
        },
        hasData: false,
        dataConf: false
    })
    useEffect (() => {
        //useDataFetch(key, users, setUsers)
    }, [])

    function handleEditClick(event: React.MouseEvent<HTMLButtonElement>) {
        editClick(event, key, history)
    }

    function handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
        deleteClick(event, key, history)
    }

    function List() {
        if (users.hasData) {
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
                        {users.data.data.map((user: UserModel) => (
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
                                        onClick={handleDeleteClick}
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
                        <Button type="button" onClick={() => history.push(`/${key}/new`)}>
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

