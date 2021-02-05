import Input from "../../../components/Input"
import InputMask from "../../../components/Input/InputMask"
import { CustomerModel,  } from "../interface"
import React, { ChangeEvent } from "react"
import { Col, Row } from "react-bootstrap"

type handleChange= (event: ChangeEvent<HTMLInputElement>) => void
interface Params {
    handleChangeFunction: handleChange
    state: CustomerModel
}

export default function CustomerForm(params: Params)  {
    return ( <>
        <Row lg={4} md={2} >
            <Col lg={12} md={12} >
                <Input
                    id="nome"
                    className="input-nome"
                    textlabel="Nome"
                    name="nome"
                    placeholder="Insira seu nome"
                    value={params.state.nome}
                    onChange={params.handleChangeFunction}
                />
            </Col>
        </Row>

        <Row lg={4} md={2}>
            <Col lg={6} md={6}>
                <InputMask
                    id="cpf"
                    className="input-cpf"
                    textlabel="CPF"
                    name="cpf"
                    mask="999.999.999-99"
                    alwaysShowMask={true}
                    placeholder="CPF"
                    value={params.state.cpf}
                    onChange={params.handleChangeFunction}
                />
            </Col>
            <Col lg={6} md={6}>
                <InputMask
                    id="dt_nascimento"
                    className="input-dt-nascimento"
                    textlabel="Data de nascimento"
                    mask="99/99/9999"
                    alwaysShowMask={true}
                    maskPlaceholder="dd/mm/yyyy"
                    placeholder="Data de nascimento"
                    name="dt_nascimento"
                    value={params.state.dt_nascimento}
                    onChange={params.handleChangeFunction}
                />
            </Col>
        </Row>
        </>)
}
