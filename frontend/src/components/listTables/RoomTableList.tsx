import { useContext } from "react"

import { RoomFetch, RoomModel } from "../../interfaces/RoomInterfaces"
import { UserContext } from "../../context/UserContext"

import Button from "../Button"
import { Table } from 'react-bootstrap'
import { FiEdit, FiTrash2 } from "react-icons/fi"
import colors from "../../styles/colors.json"
import styles from "../../styles/list.module.css"


interface RoomTableListItems {
    state: RoomFetch
    handleDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    handleEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function RoomTableList({ state, handleDeleteClick, handleEditClick }: RoomTableListItems) {
    const { admin } = useContext(UserContext)

    if (state.hasData) {
        return (<>
            <Table className={styles.table} striped borderless hover size="sm" responsive="md">
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Descricão</th>
                        <th>Tipo</th>
                        {admin && <th id="button"></th>}
                    </tr>
                </thead>
                <tbody>
                    {state.data.map((room: RoomModel) => (
                        <tr key={room.id}>
                            <td >{room.room_number}</td>
                            <td >{room.description}</td>
                            <td >{room.type_of_room}</td>
                            {admin && (
                                <td >
                                    <Button
                                        type="button"
                                        variant="second"
                                        value={room.id}
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
                                        value={room.id}
                                        onClick={handleDeleteClick}
                                    >
                                        <FiTrash2 size={19} color={colors.background} />
                                    </Button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>)
    } else return (<div> <p>Nenhum dado encontrado</p></div>)
}