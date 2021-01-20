import React from "react"
import { useHistory } from 'react-router-dom'
import { useDataFetch, editClick, deleteClick } from '../../../services/helpers'
import { customerModel} from '../interface'
import { Container, Row, Col, Table, Button }from 'react-bootstrap'

import { FiPlus } from "react-icons/fi";

import './styles.css';

export default function ClientList() {
    const key: string = 'customers'
    const history = useHistory()
    const customers = useDataFetch(key)

    function handleEditClick(event: React.MouseEvent<HTMLButtonElement>) {
        editClick(event, key, history)
    }

    function handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
        deleteClick(event, key, history)
    }
    
    function List() {
        if (customers.hasData) {
            return (<>
                <Table striped borderless hover size="sm" responsive="lg">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data de nascimento</th>
                            <th>CPF</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers!.data.map((customer: customerModel) => (
                            <tr key={customer.id}>
                                <td >{customer.nome}</td>
                                <td >{customer.dt_nascimento}</td>
                                <td >{customer.cpf}</td>
                                <td >
                                    <Button
                                        type="button"
                                        value={customer.id}
                                        onClick={handleEditClick}
                                    >editar</Button>{' '}
                                    <Button
                                        type="button"
                                        variant="danger"
                                        value={customer.id}
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
                    <h1> Clientes </h1>
                </Row>
                <Row>
                    <Col sm={10}></Col>
                    <Col sm={2}>
                        <Button type="button" onClick={() => history.push(`/${key}/novo`)}>
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

