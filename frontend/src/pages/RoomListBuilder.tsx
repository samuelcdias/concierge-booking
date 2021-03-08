import { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"

import { Button, Col, Container, Row } from 'react-bootstrap'

import { enumParams } from "../services/initialStates"
import { ListContext } from "../context/ListContext"
import { RoutesContext } from "../context/RoutesContext"
import RoomListEntries from "../components/listTables/RoomTableList"
import { FiPlus } from "react-icons/fi";
import colors from "../styles/colors.json"
import { UserContext } from "../context/UserContext"

export default function CustomerList() {
    const history = useHistory()

    const { admin } = useContext(UserContext)

    const {
        routeKey,
        setRouteKey,
    } = useContext(RoutesContext)

    useEffect(() => {
        setRouteKey(enumParams.ROOMS)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeKey])
    const { handleDeleteClick, handleEditClick, state } = useContext(ListContext)

    return (
        <div>
            <Container>
                <Row>
                    <h1>Quartos</h1>
                </Row>
                <Row>
                    <Col sm={11}></Col>
                    <Col sm={1}>
                        {admin && (
                            <Button type="button" onClick={() => history.push(`/${routeKey}/new`)}>
                                <FiPlus size={23} color={colors.background} />
                            </Button>
                        )}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <RoomListEntries
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                        state={state}
                    />
                </Row>
            </Container>
        </div>
    )
}

