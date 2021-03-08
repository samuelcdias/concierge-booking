import { Col, Form, Row } from 'react-bootstrap'

export default function RoomFormEntries({ state, handleChange }: { state: any, handleChange: any }) {
    return (
        <>
            <Form.Group >
                {/*<Form.Label column sm="2">Número</Form.Label>*/}
                <Form.Control
                    type="text"
                    placeholder="Número do quarto"
                    name="room_number"
                    value={state.room_number}
                    onChange={handleChange}
                    required
                />
                <Form.Text className="text-muted">
                    Entre com o número do quarto conforme uso do hotel.
            </Form.Text>
            </Form.Group>

            <Form.Group>
                {/*<Form.Label>Descricão</Form.Label>*/}
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
                <Form.Text className="text-muted">
                    Descreva o quarto.
        </Form.Text>
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
                        <Form.Control
                            type="number"
                            min="1"
                            name="number_of_beds"
                            value={state.number_of_beds}
                            onChange={handleChange}
                            required
                        />
                        <Form.Text className="text-muted">
                            Nº de leitos.
                </Form.Text>
                    </Form.Group>
                </Col>

                <Col md={9}>
                    <Form.Group>
                        {/*<Form.Label>Tipo</Form.Label>*/}
                        <Form.Control
                            type="text"
                            name="type_of_room"
                            value={state.type_of_room}
                            onChange={handleChange}
                            required
                        />
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
                        <Form.Control
                            type="number"
                            min="0"
                            name="number_of_extra_beds"
                            value={state.number_of_extra_beds}
                            onChange={handleChange}
                        />
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
        </>
    )
}