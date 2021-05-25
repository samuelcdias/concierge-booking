import CustomerBaseForm from "./CustomerBaseFields"
import Input from "../Input";
import PickDate from "../selectDate"
import FormGroup from "../FormGroup";
import styles from "../../styles/components/fields.module.css"
import { useState } from "react";

export default function CustomerFormEntries({ state, stateProps, handleChange }: { state: any, stateProps: any, handleChange: any }) {
    const [date, setDate] = useState(new Date())
    return (
        <>
            <CustomerBaseForm handleChangeFunction={handleChange} state={state} />

            {(stateProps.dataConf) && (
                <div>
                    <FormGroup
                        label="Documento"
                        text="Entre com dados do documento"
                    >
                        <div className={styles.displayLine}>
                            <Input
                                name="num_doc_identidade"
                                type="number"
                                placeholder="Número"
                                value={state.num_doc_identidade}
                                onChange={handleChange}
                            />
                            <Input
                                name="orgao_doc_identidade"
                                type="text"
                                placeholder="Org. exp."
                                value={state.orgao_doc_identidade}
                                onChange={handleChange}
                            />
                            <Input
                                name="tipo_doc_identidade"
                                type="text"
                                placeholder="Tipo"
                                value={state.tipo_doc_identidade}
                                onChange={handleChange}
                            />
                            <div className={styles.pickDateNormalizer}>
                                <PickDate
                                    startDate={date}
                                    setStartDate={setDate}
                                    endDate={date}
                                    setEndDate={setDate}
                                />
                            </div>
                        </div>
                    </FormGroup>
                    <div className={styles.displayLine}>
                        <FormGroup
                            label="Nacionalidade"
                        >
                            <Input
                                name="nacionalidade"
                                type="text"
                                placeholder="Nacionalidade"
                                value={state.nacionalidade}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup
                            label="Profissão"
                        >
                            <Input
                                name="profissao"
                                type="text"
                                placeholder="Profissão"
                                value={state.profissao}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup
                            label="Sexo"
                        >
                            <div className={styles.selectContent} >
                                <select className={styles.select} name="sexo">
                                    <option className={styles.option} value="M">Masculino</option>
                                    <option className={styles.option} value="F">Feminino</option>
                                </select>
                            </div>
                        </FormGroup>

                    </div>
                    <FormGroup
                        label="Local de origem"
                        text="Entre com dados de onde você está saindo"
                    >
                        <div className={styles.displayLine}>
                            <Input
                                name="cidade"
                                type="text"
                                placeholder="Cidade"
                                value={state.cidade}
                                onChange={handleChange}
                            />
                            <Input
                                name="estado"
                                type="text"
                                placeholder="Estado"
                                value={state.estado}
                                onChange={handleChange}
                            />
                            <Input
                                name="pais"
                                type="text"
                                placeholder="País"
                                value={state.pais}
                                onChange={handleChange}
                            />
                        </div>

                    </FormGroup>
                </div>
            )
            }
        </>
    )
}