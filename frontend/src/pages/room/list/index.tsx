import React, { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { useDataFetch, editClick, deleteClick } from '../../../services/helpers'

import { Table, Button, Container, Row, Col } from 'react-bootstrap'
import { FiPlus } from "react-icons/fi"

import colors from '../../../styles/colors.json'
import './styles.css';
import { RoomFetch, RoomModel } from "../interface"

export default function RoomList() {
    const key = 'rooms'
    const history = useHistory()
    const [rooms, setRooms] = useState<RoomFetch>({
        data:  [{
            room_number: '',
            description: '',
            number_of_beds: 0,
            type_of_room: ''
        }],
        count: 0,
        limit: 10,
        hasData: false,
        dataConf: false
    })
    
    useEffect(() => { 
        async function CallData(){
            const data = await useDataFetch(`${key}`)
            setRooms(data)
        }
        CallData()
    },[])

    function handleEditClick(event: React.MouseEvent<HTMLButtonElement>) {
        editClick(event, key, history)
    }

    function handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
        deleteClick(event, key, history)
    }

    function List() {
        if (rooms.hasData) {
            return (<>
                <Table striped borderless hover size="sm" responsive="lg" >
                    <thead>
                        <tr>
                            <th>Número</th>
                            <th>Descricão</th>
                            <th>Tipo</th>
                            <th id="button"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.data.map((room: RoomModel) => (
                            <tr key={room.id}>
                                <td >{room.room_number}</td>
                                <td >{room.description}</td>
                                <td >{room.type_of_room}</td>
                                <td >
                                    <Button
                                        type="button"
                                        value={room.room_number}
                                        onClick={handleEditClick}
                                    >editar</Button>{' '}
                                    <Button
                                        type="button"
                                        variant="danger"
                                        value={room.room_number}
                                        onClick={handleDeleteClick}
                                    >excluir</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>)
        
        } else return (<div> <p>Nenhum dado encontrado</p> </div>)
    }

    return (
            <Container> 
                <Row>
                    <h1>Quartos</h1>
                </Row>
                <Row>
                    <Col sm={11}></Col>
                    <Col sm={1}>
                        <Button type="button" onClick={() => history.push(`/${key}/novo`)}>
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

