import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";

import { enumParams, ParamsType } from "@services/initialStates";
import { FormContext } from "@contexts/FormContext";
import { RoutesContext } from "@contexts/RoutesContext";
import Button from "@components/Button";
import RoomFormEntries from "@components/formsFields/RoomFormEntries";

import "../styles/form.css";

export default function RoomForm() {
  const { params, routeKey, setParams, setRouteKey } =
    useContext(RoutesContext);
  const paramsProvided = useParams<ParamsType>();

  useEffect(() => {
    setRouteKey(enumParams.ROOMS);
    setParams(paramsProvided);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey, params]);

  const { state, handleChange, handleSubmit } = useContext(FormContext);

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <legend> Cadastrar Quartos </legend>

        <RoomFormEntries state={state} handleChange={handleChange} />

        <div className="d-flex justify-content-center">
          <Button type="submit" width="7rem" height="2.5rem" padding={false}>
            Cadastrar
          </Button>
        </div>
      </Form>
    </div>
  );
}
