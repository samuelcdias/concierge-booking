import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { Col, Container, Row } from "react-bootstrap";

import { enumParams } from "@services/initialStates";
import { ListContext } from "@context/ListContext";
import { RoutesContext } from "@context/RoutesContext";

import ListEntries from "@components/listTables/CustomerTableList";

import { FiPlus } from "react-icons/fi";
import Button from "@components/Button";
import colors from "@styles/colors.json";
import PaginationItem from "@components/Pagination";

export default function CustomerList() {
  const history = useRouter();

  const { query, routeKey, setRouteKey, setActivePage } =
    useContext(RoutesContext);
  const { handleDeleteClick, handleEditClick, state, setIsOutdated } =
    useContext(ListContext);

  useEffect(() => {
    if (routeKey !== enumParams.CUSTOMERS) {
      setRouteKey(enumParams.CUSTOMERS);
      setIsOutdated(true);
    }
    setActivePage(Number(query) === 0 ? 1 : Number(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey]);

  return (
    <>
      <Container>
        <Row d-flex justify-content-around>
          <h1>Clientes</h1>
        </Row>
        <Row>
          <Col sm={11}></Col>
          <Col sm={1}>
            <Button
              type="button"
              width="2.5rem"
              height="2.5rem"
              padding={false}
              onClick={() => history.push(`/${routeKey}/new`)}
            >
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
          <PaginationItem routeKey={enumParams.CUSTOMERS} />
        </Row>
      </Container>
    </>
  );
}
