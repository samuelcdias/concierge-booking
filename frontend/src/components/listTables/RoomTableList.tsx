import { RoomFetch, RoomModel } from "../../interfaces/RoomInterfaces"
import { Button, Table } from 'react-bootstrap'
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"

interface RoomTableListItems {
    state: RoomFetch
    handleDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    handleEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function RoomTableList({ state, handleDeleteClick, handleEditClick }: RoomTableListItems) {
    const { admin } = useContext(UserContext)

    if (state.hasData) {
        return (<>
            <Table striped borderless hover size="sm" responsive="lg">
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
                                        value={room.room_number}
                                        onClick={handleEditClick}
                                    >editar</Button>{' '}
                                    <Button
                                        type="button"
                                        variant="danger"
                                        value={room.room_number}
                                        onClick={handleDeleteClick}
                                    >excluir</Button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>)
    } else return (<div> <p>Nenhum dado encontrado</p></div>)
}