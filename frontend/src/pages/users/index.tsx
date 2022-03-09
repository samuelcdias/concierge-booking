import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Button from "@components/Button";
import { Col, Container, Row } from "react-bootstrap";

import { enumParams } from "@services/initialStates";
import { ListContext } from "@contexts/ListContext";
import { RoutesContext } from "@contexts/RoutesContext";
import UserListEntries from "@components/listTables/UserTableList";
import { FiPlus } from "react-icons/fi";
import colors from "@styles/colors.json";

export default function CustomerList() {
  const router = useRouter();

  const { query, routeKey, setRouteKey, setActivePage } =
    useContext(RoutesContext);
  const { handleDeleteClick, handleEditClick, state, setIsOutdated } =
    useContext(ListContext);

  useEffect(() => {
    if (routeKey !== enumParams.USERS) {
      setRouteKey(enumParams.USERS);
      setIsOutdated(true);
    }
    setActivePage(Number(query) === 0 ? 1 : Number(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey]);

  return (
    <>
      <Container>
        <Row d-flex justify-content-around>
          <h1>Usuários</h1>
        </Row>
        <Row>
          <Col sm={11}></Col>
          <Col sm={1}>
            <Button
              type="button"
              width="2.5rem"
              height="2.5rem"
              padding={false}
              onClick={() => router.push(`/${routeKey}/new`)}
            >
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
    </>
  );
}
