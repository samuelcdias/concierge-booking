import React from "react"
import { useHistory } from 'react-router-dom'
import { useDataFetch, editClick, deleteClick } from '../../../services/helpers'

import { Table, Button, Container, Row, Col } from 'react-bootstrap'
import { FiPlus } from "react-icons/fi"

import colors from '../../styles/colors.json'
import './styles.css';

export default function RoomList() {
    const key = 'quartos'
    const history = useHistory()
    const quartos = useDataFetch(key)

    function handleEditClick(event: React.MouseEvent<HTMLButtonElement>) {
        editClick(event, key, history)
    }

    function handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
        deleteClick(event, key, history)
    }

    function List() {
        if (quartos.hasData) {
            return (<>
                <Table striped borderless hover size="sm" responsive="lg" >
                    <thead>
                        <tr>
                            <th>Número</th>
                            <th>Descricão</th>
                            <th>Tipo</th>
                            <th>Status</th>
                            <th id="button"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {quartos!.data.map((quarto) => (
                            <tr key={quarto.id}>
                                <td >{quarto.numero}</td>
                                <td >{quarto.descricao}</td>
                                <td >{quarto.tipo}</td>
                                <td >{quarto.status}</td>
                                <td >
                                    <Button
                                        type="button"
                                        value={quarto.numero}
                                        onClick={handleEditClick}
                                    >editar</Button>{' '}
                                    <Button
                                        type="button"
                                        variant="danger"
                                        value={quarto.numero}
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
                    <h1>Quartos</h1>
                </Row>
                <Row>
                    <Col sm={11}></Col>
                    <Col sm={1}>
                        <Button type="button" onClick={() => history.push(`/quartos/novo`)}>
                            <FiPlus size={23} color={colors.background} />
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <List />
                </Row>
            </Container>

    );
}

