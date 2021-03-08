import { UserFetch, UserModel } from "../../interfaces/UserInterfaces"
import { Button, Table } from 'react-bootstrap'

interface UserTableListItems {
    state: UserFetch
    handleDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    handleEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function UserTableList({ state, handleDeleteClick, handleEditClick }: UserTableListItems) {

    if (state.hasData) {
        return (<>
            <Table striped borderless hover size="sm" responsive="lg" >
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>username</th>
                        <th>admin?</th>
                        <th id="button"></th>
                    </tr>
                </thead>
                <tbody>
                    {state.data.map((user: UserModel) => (
                        <tr key={user.id}>
                            <td >{user.name}</td>
                            <td >{user.username}</td>
                            <td >{user.admin ? "Sim" : "Não"}</td>
                            <td >
                                <Button
                                    type="button"
                                    value={user.id}
                                    onClick={handleEditClick}
                                >editar</Button>{' '}
                                <Button
                                    type="button"
                                    variant="danger"
                                    value={user.id}
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
