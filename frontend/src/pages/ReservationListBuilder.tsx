import { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"

import { Col, Container, Row } from 'react-bootstrap'

import { enumParams } from "../services/initialStates"
import { ListContext } from "../context/ListContext"
import { RoutesContext } from "../context/RoutesContext"

import ListEntries from "../components/listTables/ReservationTableList"

import { FiPlus } from "react-icons/fi";
import Button from "../components/Button"
import colors from "../styles/colors.json"
import PaginationItem from "../components/Pagination"

export default function CustomerList() {
    const history = useHistory()

    const {
        query,
        routeKey,
        setRouteKey,
        setActivePage
    } = useContext(RoutesContext)
    const { handleDeleteClick, handleEditClick, state, setIsOutdated } = useContext(ListContext)

    useEffect(() => {
        if (routeKey !== enumParams.RESERVATIONs) {
            setRouteKey(enumParams.RESERVATIONs)
            setIsOutdated(true)
        }
        setActivePage(Number(query) === 0 ? 1 : Number(query))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeKey])

    return (
        <div>
            <Container>
                <Row d-flex justify-content-around>
                    <h1> Reservas</h1>
                </Row>
                <Row>
                    <Col sm={11}></Col>
                    <Col sm={1} >
                        <Button
                            type="button"
                            width="2.5rem"
                            height="2.5rem"
                            padding={false}
                            onClick={() => history.push(`/${routeKey}/new`)}>
                            <FiPlus size={23} color={colors.background} />
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <ListEntries
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                        state={state}
                    />

                </Row>
                <Row>
                    <PaginationItem routeKey={enumParams.RESERVATIONs} />
                </Row>
            </Container>
        </div>
    )
}