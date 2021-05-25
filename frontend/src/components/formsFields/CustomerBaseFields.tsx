import Input from "../Input"
import InputMask from "../InputMask"
import { CustomerModel } from "../../interfaces/CustomerInterfaces"
import { ChangeEvent, useState } from "react"
import { Col, Row } from "react-bootstrap"
import FormGroup from "../FormGroup"
import PickDate from "../selectDate"
import styles from "../../styles/components/fields.module.css"

type handleChange = (event: ChangeEvent<HTMLInputElement>) => void

interface Params {
    handleChangeFunction: handleChange
    state: CustomerModel
}

export default function CustomerBaseForm(params: Params) {
    const today = new Date()
    const [date, setDate] = useState<Date>(today)
    //params.state.dt_nascimento

    return (<>
        <Row lg={4} md={2} >
            <Col lg={12} md={12} >
                <FormGroup
                    htmlFor="nome"
                    label="Nome"
                >
                    <Input
                        id="nome"
                        className="input-nome"
                        name="nome"
                        placeholder="Insira seu nome"
                        value={params.state.nome}
                        onChange={params.handleChangeFunction}
                    />
                </FormGroup>
            </Col>
        </Row>

        <Row lg={4} md={2}>
            <Col lg={6} md={6}>
                <FormGroup
                    htmlFor="cpf"
                    label="CPF"
                >
                    <InputMask
                        id="cpf"
                        className="input-cpf"
                        name="cpf"
                        mask="999.999.999-99"
                        alwaysShowMask={true}
                        placeholder="CPF"
                        value={params.state.cpf}
                        onChange={params.handleChangeFunction}
                    />
                </FormGroup>
            </Col>
            <Col lg={6} md={6}>
                <FormGroup
                    htmlFor="cpf"
                    label="Data nascimento"
                >
                    <div className={styles.pickDateNormalizer}>
                        <PickDate
                            startDate={date}
                            setStartDate={setDate}
                            endDate={date}
                            setEndDate={setDate}
                        />
                    </div>
                </FormGroup>
            </Col>
        </Row>
    </>)
}