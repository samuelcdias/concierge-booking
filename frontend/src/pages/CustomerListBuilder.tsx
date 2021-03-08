import { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"

import { Col, Container, Row } from 'react-bootstrap'

import { enumParams } from "../services/initialStates"
import { ListContext } from "../context/ListContext"
import { RoutesContext } from "../context/RoutesContext"

import ListEntries from "../components/listTables/CustomerTableList"

import { FiPlus } from "react-icons/fi";
import colors from "../styles/colors.json"
import styles from "../styles/components/button.module.css"

export default function CustomerList() {
    const history = useHistory()

    const {
        routeKey,
        setRouteKey,
    } = useContext(RoutesContext)

    useEffect(() => {
        setRouteKey(enumParams.CUSTOMERS)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeKey])
    const { handleDeleteClick, handleEditClick, state } = useContext(ListContext)

    return (
        <div>
            <Container>
                <Row className="text-top-100 start-100 translate-middle">
                    <h1 >Clientes</h1>
                </Row>
                <Row>
                    <Col sm={11}></Col>
                    <Col sm={1} className={styles.customButton} >
                        <button type="button" onClick={() => history.push(`/${routeKey}/new`)}>
                            <FiPlus size={23} color={colors.background} />
                        </button>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <ListEntries
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                        state={state}
                    />
                </Row>
            </Container>
        </div>
    )
}

