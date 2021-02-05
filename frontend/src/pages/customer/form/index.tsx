import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { useDataFetch, handleSubmitClick, handleInputChange } from '../../../services/helpers'

import Input from "../../../components/Input"
import Button from "../../../components/Button"
import { BlockContent, FormStyle, Content } from "./styles"
import CustomerForm from "./basicform"

import { CustomerModel, CustomerParams } from "../interface"

export default function CreateClient() {
    const key = "customers"
    const history = useHistory()

    const params = useParams<CustomerParams>()
    const [dataConf, setDataConf] = useState<boolean>()
    const [state, setState] = useState<CustomerModel>({
        id: params.id ? Number(params.id) : undefined,
        nome: '',
        cpf: '',
        dt_nascimento: '',
        num_doc_identidade: '',
        tipo_doc_identidade: '',
        orgao_doc_identidade: '',
        nacionalidade: '',
        profissao: '',
        dt_identidade: '',
        genero: '',
        cidade: '',
        estado: '',
        pais: '',
        motivo_viagem: undefined,
        meio_transporte: undefined
    })

    useEffect(() => { 
        async function CallData(){
            const data = await useDataFetch(`${key}/${params.id}`)
            setState(data.data)
            setDataConf(data.dataConf)
        }
        if (params.id){ 
            CallData()
        }
    },[])
  
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        handleInputChange(event,setState, state)
    }

    async function handleSubmit(event: FormEvent) {
        handleSubmitClick(event, state, key, history)
    }

    

    return (
        <Content id="page-create-user">
            <FormStyle className="create-user-form" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Cadastrar Cliente</legend>

                    <CustomerForm handleChangeFunction={handleChange} state={state}/>

                    {(dataConf) && (
                        <BlockContent>
                        <legend>Documento</legend>
                        <div>
                            <Input
                                name="num_doc_identidade"
                                className="input-num-doc"
                                type="text"
                                placeholder="Número"
                                value={state.num_doc_identidade}
                                onChange={handleChange}
                            />
                            <Input
                                name="orgao_doc_identidade"
                                className="input-org-doc"
                                type="text"
                                placeholder="Org. exp."
                                value={state.orgao_doc_identidade}
                                onChange={handleChange}
                            />
                            <Input
                                name="tipo_doc_identidade"
                                className="input-tipo-doc"
                                type="text"
                                placeholder="Tipo"
                                value={state.tipo_doc_identidade}
                                onChange={handleChange}
                            />
                        </div>
                    </BlockContent>
                    )
                    }  

                    <Button type="submit">Cadastrar</Button>
                </fieldset>
            </FormStyle>                                                    
        </Content>
    );
}

