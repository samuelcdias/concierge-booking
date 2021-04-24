import { UserFetch, UserModel } from "../../interfaces/UserInterfaces"

import Button from "../Button"
import { Table } from 'react-bootstrap'
import { FiTrash2, FiEdit } from "react-icons/fi"
import colors from "../../styles/colors.json"
import styles from "../../styles/list.module.css"

interface UserTableListItems {
    state: UserFetch
    handleDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    handleEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function UserTableList({ state, handleDeleteClick, handleEditClick }: UserTableListItems) {

    if (state.hasData) {
        return (<>
            <Table className={styles.table} striped borderless hover size="sm" responsive="md" >
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
                                    variant="second"
                                    value={user.id}
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
                                    value={user.id}
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
