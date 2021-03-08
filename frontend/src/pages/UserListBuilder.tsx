import { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"

import { Button, Col, Container, Row } from 'react-bootstrap'

import { enumParams } from "../services/initialStates"
import { ListContext } from "../context/ListContext"
import { RoutesContext } from "../context/RoutesContext"
import UserListEntries from "../components/listTables/UserTableList"
import { FiPlus } from "react-icons/fi";
import colors from "../styles/colors.json"

export default function CustomerList(){
    const history = useHistory()

    const {
        routeKey,
        setRouteKey,
    } = useContext(RoutesContext)

    useEffect(() =>{
        setRouteKey(enumParams.USERS)  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeKey])
    const { handleDeleteClick, handleEditClick, state } = useContext(ListContext)

    return(
        <div>
            <Container> 
                <Row>
                    <h1>Usuários</h1>
                </Row>
                <Row>
                    <Col sm={11}></Col>
                    <Col sm={1}>
                        <Button type="button" onClick={() => history.push(`/${routeKey}/new`)}>
                            <FiPlus size={23} color={colors.background} />
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <UserListEntries
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                        state={state} 
                    />
                </Row>
            </Container>
        </div>
    )
}

