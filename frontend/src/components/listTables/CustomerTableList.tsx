import { CustomerFetch, CustomerModel } from "../../interfaces/CustomerInterfaces"
import { Button, Table } from 'react-bootstrap'

interface CustomerTableListItems {
    state: CustomerFetch
    handleDeleteClick: (event:React.MouseEvent<HTMLButtonElement>) => void
    handleEditClick: (event:React.MouseEvent<HTMLButtonElement>) => void
}

export default function CustomerTableList({state, handleDeleteClick, handleEditClick}: CustomerTableListItems ) {


    if (state.hasData) {
        return (<>
            <Table striped borderless hover size="sm" responsive="lg">
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
                                    value={customer.id}
                                    onClick={handleEditClick}
                                >editar</Button>{' '}
                                <Button
                                    type="button"
                                    variant="danger"
                                    value={customer.id}
                                    onClick={handleDeleteClick}
                                >excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>)
    } else return (<div> <p>Nenhum dado encontrado</p></div>)
}