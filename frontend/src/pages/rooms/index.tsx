import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { Col, Container, Row } from "react-bootstrap";
import Button from "@components/Button";

import { enumParams } from "@services/initialStates";
import { ListContext } from "@contexts/ListContext";
import { RoutesContext } from "@contexts/RoutesContext";
import RoomListEntries from "@components/listTables/RoomTableList";

import { FiPlus } from "react-icons/fi";
import colors from "@styles/colors.json";
import { UserContext } from "@contexts/UserContext";

export default function CustomerList() {
  const history = useRouter();

  const { admin } = useContext(UserContext);

  const { query, routeKey, setRouteKey, setActivePage } =
    useContext(RoutesContext);
  const { handleDeleteClick, handleEditClick, setIsOutdated, state } =
    useContext(ListContext);

  useEffect(() => {
    if (routeKey !== enumParams.ROOMS) {
      setRouteKey(enumParams.ROOMS);
      setIsOutdated(true);
    }
    setActivePage(Number(query) === 0 ? 1 : Number(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey]);

  return (
    <div>
      <Container>
        <Row d-flex justify-content-around>
          <h1>Quartos</h1>
        </Row>
        <Row>
          <Col sm={11}></Col>
          <Col sm={1}>
            {admin && (
              <Button
                type="button"
                width="2.5rem"
                height="2.5rem"
                padding={false}
                onClick={() => history.push(`/${routeKey}/new`)}
              >
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
  );
}
