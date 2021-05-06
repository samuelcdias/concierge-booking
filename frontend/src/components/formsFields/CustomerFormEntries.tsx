import CustomerBaseForm from "./CustomerBaseFields"
import Input from "../Input";

export default function CustomerFormEntries({state, stateProps, handleChange}:{state: any, stateProps: any, handleChange: any}){
    return (
        <>
        <CustomerBaseForm handleChangeFunction={handleChange} state={state}/>

        {(stateProps.dataConf) && (
        <div className="blockContent">
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
        </div>
    )}
    </>
    )
}