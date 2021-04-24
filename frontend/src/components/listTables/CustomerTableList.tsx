import { CustomerFetch, CustomerModel } from "../../interfaces/CustomerInterfaces"
import { Table } from 'react-bootstrap'
import { FiEdit, FiTrash2 } from "react-icons/fi"
import colors from "../../styles/colors.json"
import styles from "../../styles/list.module.css"

import Button from "../Button"

interface CustomerTableListItems {
    state: CustomerFetch
    handleDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    handleEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function CustomerTableList({ state, handleDeleteClick, handleEditClick }: CustomerTableListItems) {


    if (state.hasData) {
        return (<>
            <Table className={styles.table} striped borderless hover size="sm" responsive="md">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data de nascimento</th>
                        <th>CPF</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {state.data && state.data.map((customer: CustomerModel) => (
                        <tr key={customer.id}>
                            <td >{customer.nome}</td>
                            <td >{customer.dt_nascimento}</td>
                            <td >{customer.cpf}</td>
                            <td >
                                <Button
                                    type="button"
                                    variant="second"
                                    value={customer.id}
                                    padding={false}
                                    width="2.25rem"
                                    height="2.25rem"
                                    onClick={handleEditClick}
                                >
                                    <FiEdit size={19} color={colors.background} />
                                </Button>
                                <Button
                                    type="button"
                                    variant="danger"
                                    padding={false}
                                    width="2.25rem"
                                    height="2.25rem"
                                    value={customer.id}
                                    onClick={handleDeleteClick}
                                >
                                    <FiTrash2 size={19} color={colors.background} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>)
    } else return (<div> <p>Nenhum dado encontrado</p></div>)
}