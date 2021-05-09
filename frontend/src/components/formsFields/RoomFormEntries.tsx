import { Col, Row } from 'react-bootstrap'
import FormGroup from "../FormGroup"
import Input from '../Input'
import styles from "../../styles/components/fields.module.css"

export default function RoomFormEntries({ state, handleChange }: { state: any, handleChange: any }) {
    return (
        <div className={styles.content}>
            <FormGroup
                htmlFor="room_number"
                label="Nº Quarto"
                text="Entre com o número do quarto conforme uso do hotel."
            >
                <Input
                    type="text"
                    id="room_number"
                    name="room_number"
                    placeholder="Número do quarto"
                    value={state.room_number}
                    onChange={handleChange}
                    required
                />
            </FormGroup>

            <FormGroup
                htmlFor="description"
                label="Descrição"
                text="Descreva o quarto."
            >
                <div className={styles.container}>
                    <textarea
                        cols={30}
                        rows={3}
                        className={styles.textarea}
                        id="description"
                        name="description"
                        placeholder="Descreva o quarto"
                        value={state.description}
                        onChange={handleChange}
                        required
                    />
                </div>
            </FormGroup>

            <Row>
                <Col md={4}>
                    <FormGroup
                        htmlFor="number_of_beds"
                        label="Leitos"
                        text="Nº de leitos."
                    >
                        {/*<Form.Label>Quantidade de leitos</Form.Label>*/}
                        <Input
                            type="number"
                            min="1"
                            id="number_of_beds"
                            name="number_of_beds"
                            value={state.number_of_beds}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                </Col>

                <Col md={6}>
                    <FormGroup
                        htmlFor="type_of_room"
                        label="Tipo quarto"
                        text="Entre com a tipo/categoria a qual este quarto irá pertencer."
                    >
                        <Input
                            type="text"
                            id="type_of_room"
                            name="type_of_room"
                            value={state.type_of_room}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col md="3">
                    <FormGroup
                        htmlFor="number_of_extra_beds"
                        label="Camas extras"
                        text="Entre com nº de camas extras"
                    >
                        <Input
                            type="number"
                            min="0"
                            id="number_of_extra_beds"
                            name="number_of_extra_beds"
                            value={state.number_of_extra_beds}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Col>

                {/*<Col md="9">
            <FormGroup>
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
            </FormGroup>
        </Col>*/}
            </Row>


        </div >
    )
}