import { ReservationFetch, ReservationView } from "../../interfaces/ReservationInterfaces"
import { Table } from 'react-bootstrap'
import { FiEdit, FiTrash2 } from "react-icons/fi"
import colors from "../../styles/colors.json"
import styles from "../../styles/list.module.css"

import Button from "../Button"

interface ReservationTableListItems {
    state: ReservationFetch
    handleDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    handleEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function ReservationTableList({ state, handleDeleteClick, handleEditClick }: ReservationTableListItems) {


    if (state.hasData) {
        return (<>
            <Table className={styles.table} striped borderless hover size="sm" responsive="md">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nº do quarto</th>
                        <th>Data de entrada</th>
                        <th>Data de saída</th>
                        <th>Hora de entrada</th>
                        <th>Hora de saída</th>
                        <th>Observações</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {state.data && state.data.map((reservation: ReservationView) => (
                        <tr key={reservation.codigo}>
                            <td >{reservation.codigo}</td>
                            <td >{reservation.room_number}</td>
                            <td >{formatDate(reservation.dt_entrada_reserva)}</td>
                            <td >{formatDate(reservation.dt_saida_reserva)}</td>
                            <td >{reservation.hora_entrada}</td>
                            <td >{reservation.hora_saida}</td>
                            <td >{reservation.obs}</td>
                            <td >
                                <Button
                                    type="button"
                                    variant="second"
                                    value={reservation.codigo}
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
                                    value={reservation.codigo}
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

function formatDate(date: string): string {
    const dateObject = new Date(date)
    const dateString = String(dateObject.getDate()) + "/" +
        String(dateObject.getMonth()) + "/" +
        String(dateObject.getFullYear())
    return dateString
}