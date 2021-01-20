import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { useDataFetch, handleSubmitClick, handleInputChange} from '../../../services/helpers'

import { Col, Form, Row }from 'react-bootstrap'
import Button from "../../../components/Button";
import { roomModel, roomParams } from "../interface"

import styled from "styled-components";
import colors from "../../styles/colors.json"


export default function CreateClient() {
    const key = "rooms"
    const history = useHistory();

    const params = useParams<roomParams>();
    const [state, setState] = useState<roomModel>({
        id: params.id ? params.id : undefined,
        room_number: params.numero ? params.numero : '',
        description: '',
        number_of_beds: 0,
        type_of_room: '',
        image_url: '',
        number_of_extra_beds: 0,
        dt_last_cleaning: undefined,
        dt_last_maintenance: undefined,
      })
    let promise: any = useRef(null)

    useEffect(() => {       
        async function CallData(){
            return await useDataFetch(`${key}/${params.id}`)
        }
        if (params.id){ 
            promise.current = CallData()
            setState(promise.data)
        }
    },[params.id]);
  
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        handleInputChange(event,setState, state)
    }

    async function handleSubmit(event: FormEvent) {
        handleSubmitClick(event, state, key, history)
    }

    return (
        <FormStyle>
        <Form onSubmit={handleSubmit}>
            <legend> Cadastrar Quarto </legend>
            <Form.Group >
                {/*<Form.Label column sm="2">Número</Form.Label>*/}
                    <InputDiv>
                    <Form.Control 
                        type="text"
                        placeholder="Número do quarto"
                        name="room_number"
                        value={state.room_number}
                        onChange={handleChange}
                        required
                    />  
                    </InputDiv>
                    <Form.Text className="text-muted">
                        Entre com o número do quarto conforme uso do hotel.
                    </Form.Text>
            </Form.Group>

            <Form.Group>
                {/*<Form.Label>Descricão</Form.Label>*/}
                <InputDiv>
                <Form.Control 
                    as="textarea"
                    cols={30}
                    rows={3}
                    placeholder="Descreva o quarto"
                    name="description"
                    value={state.description}
                    onChange={handleChange}
                    required
                />
                </InputDiv>
            </Form.Group>

            {/*<Form.Group controlId="formRoomImage">
                <Form.Label>Tipo</Form.Label>
                <Form.Control 
                    type="number"
                    value={image_url}
                    onChange={event => setNroCamas(Number(event.target.value))}
                />
                <Form.Text className="text-muted">
                    Entre com a tipo/categoria a qual este quarto irá pertencer.
                </Form.Text>
            </Form.Group>*/}

            <Row>
                <Col md={3}>
                    <Form.Group>
                        {/*<Form.Label>Quantidade de leitos</Form.Label>*/}
                        <InputDiv>
                        <Form.Control 
                            type="number"
                            min="1"
                            name="number_of_beds"
                            value={state.number_of_beds}
                            onChange={handleChange}
                            required
                        />
                        </InputDiv>
                        <Form.Text className="text-muted">
                                Nº de leitos.
                        </Form.Text>
                    </Form.Group>
                </Col>

                <Col md={9}>
                    <Form.Group>
                        {/*<Form.Label>Tipo</Form.Label>*/}
                        <InputDiv>
                        <Form.Control 
                            type="text"
                            name="type_of_room"
                            value={state.type_of_room}
                            onChange={handleChange}
                            required
                        />
                        </InputDiv>
                        <Form.Text className="text-muted">
                            Entre com a tipo/categoria a qual este quarto irá pertencer.
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            
            <Row>
                <Col md="3">
                    <Form.Group>
                        {/*<Form.Label>Nº camas extras</Form.Label>*/}
                        <InputDiv>
                        <Form.Control 
                            type="number"
                            min="0"
                            name="number_of_extra_beds"
                            value={state.number_of_extra_beds}
                            onChange={handleChange}
                        />
                        </InputDiv>
                        <Form.Text className="text-muted">
                            Nº camas extras.
                        </Form.Text>
                    </Form.Group>
                </Col>

                {/*<Col md="9">
                    <Form.Group>
                        <InputDiv>
                        <Form.Control
                            as="select"
                            className="my-1 mr-sm-2"
                            id="inlineFormCustomSelectPref"
                            custom
                            value={}
                            onChange={event => setStatus(event.target.value)}
                        >
                            <option value="Disponível">Disponível</option>
                            <option value="Limpeza">Limpeza</option>
                            <option value="Manutenção">Manutenção</option>
                            <option value="Indisponível">Indisponível</option>
                            <option value="Reservado">Reservado</option>
                        </Form.Control>
                        </InputDiv>
                        <Form.Text className="text-muted">
                            Status.
                        </Form.Text>
                    </Form.Group>
                </Col>*/}
            </Row>

            {/*<Form.Group controlId="formRoomDateCleaning">
                <Form.Label>Data última limpeza</Form.Label>
                <Form.Control 
                    type="date"
                    onChange={event => setDtLimpeza(event.target.value)}
                />
                <Form.Text className="text-muted">
                    Entre com a tipo/categoria a qual este quarto irá pertencer.
                </Form.Text>
            </Form.Group>*/}
            
            <Button type="submit">
                Cadastrar
            </Button>
        </Form>
        </FormStyle>
    );
}

const InputDiv = styled.div`
    input {
        background: transparent;
        border-radius: 6px;
        border: 2px solid ${colors.primary};
        color: ${colors.primary};
        outline-width: 0;
        fill-opacity:0;
        flex: 1;
        text-indent: 3px;
        padding: 2px;
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 25px;
        align-items: center;  
        max-width: 350px;      
    }
    
    textarea{
        background: transparent;
        border-radius: 6px;
        border: 2px solid ${colors.primary};
        color: ${colors.primary};
        outline-width: 0;
        fill-opacity:0;
        flex: 1;
        text-indent: 3px;
        padding: 2px;
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 25px;
        align-items: center;   
    }

    select {
        background: transparent;
        border-radius: 6px;
        border: 2px solid ${colors.primary};
        color: ${colors.primary};
        outline-width: 0;
        fill-opacity:0;
        flex: 1;
        text-indent: 3px;
        padding: 2px;
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 25px;
        align-items: center;   
    }
    `

const FormStyle = styled.div`

  box-sizing: border-box;
  padding: 40px 30px;
  margin-top: 50px;
  margin: 0 auto;
  width: 100%;
  max-width: 350px;
  `