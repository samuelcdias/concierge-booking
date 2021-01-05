import React, { FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../services/api';

import { Col, Form, Row }from 'react-bootstrap'
import Button from "../../../components/Button";
import { roomInterface, roomParams } from "../interface"

import styled from "styled-components";
import colors from "../../styles/colors.json"


export default function CreateClient() {
    const history = useHistory();

    const params = useParams<roomParams>();
    const [id, setID] = useState();
    const [numero, setNumero] = useState('');
    const [descricao, setDescricao] = useState('');
    const [nro_camas, setNroCamas] = useState(1);
    const [tipo, setTipo] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [cama_extra, setCamaExtra] = useState(0);
    const [dt_limpeza, setDtLimpeza] = useState<Date>();
    const [dt_manutencao, setDtManutencao] = useState<Date>();
    const [status, setStatus] = useState('');


    useEffect(() => {
        async function getRoomData() {
            try {
                const { data } = await api.get(`/quartos/${params.numero}`);
                setID(data.id);
                setNumero(data.numero);
                setDescricao(data.descricao);
                setNroCamas(data.nro_camas);
                setTipo(data.tipo);
                setImageUrl(data.image_url);
                setCamaExtra(data.cama_extra);
                setDtLimpeza(data.dt_limpeza);
                setDtManutencao(data.dt_manutencao);
                setStatus(data.status);
            } catch (error) {
                alert("Ocorreu um erro, tente novamente mais tarde!")
            }
        }
        if (params.numero) {
            getRoomData();
        }
    });

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const RoomData: roomInterface = {
            id: id,
            numero: numero,
            descricao: descricao,
            nro_camas: nro_camas,
            tipo: tipo,
            image_url: image_url,
            cama_extra: cama_extra,
            dt_limpeza: dt_limpeza,
            dt_manutencao: dt_manutencao,
            status: status
        }

        await api.post('/quartos', RoomData)

        alert('Cadastro realizado com sucesso!')
        history.push('/quartos');
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
                        onChange={event => setNumero(event.target.value)}
                        value={numero}
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
                    value={descricao}
                    placeholder="Descreva o quarto"
                    onChange={event => setDescricao(event.target.value)}
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
                            value={nro_camas}
                            onChange={event => setNroCamas(Number(event.target.value))}
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
                            value={tipo}
                            onChange={event => setTipo(event.target.value)}
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
                            value={cama_extra}
                            onChange={event => setCamaExtra(Number(event.target.value))}
                        />
                        </InputDiv>
                        <Form.Text className="text-muted">
                            Nº camas extras.
                        </Form.Text>
                    </Form.Group>
                </Col>

                <Col md="9">
                    <Form.Group>
                        {/*<Form.Label>Status</Form.Label>*/}
                        <InputDiv>
                        <Form.Control
                            as="select"
                            className="my-1 mr-sm-2"
                            id="inlineFormCustomSelectPref"
                            custom
                            value={status   }
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
                </Col>
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