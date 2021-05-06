import styles from "../styles/components/radioButtons.module.css"
import { ReservationFormProps } from "../interfaces/ReservationInterfaces"
import { roomProps } from "../interfaces/RoomInterfaces"

interface radioButtonsProps {
    hasData: boolean,
    state: ReservationFormProps,
    rooms: roomProps[],
    handleChange: any
}

function radioButtons({ hasData, state, rooms, handleChange }: radioButtonsProps) {
    if (hasData) {
        return (<>
            <p className="text-muted">
                Escolha o quarto
            </p>
            <div >
                {rooms.map((room, idx: number) => (
                    <div className={styles.content}>
                        <input
                            className={styles.radioButtonInput}
                            id={String(idx)}
                            type="radio"
                            name={`roomSelected`}
                            checked={state.roomSelected == room.type_of_room}
                            value={room.type_of_room}
                            onChange={handleChange}
                        />
                        <label
                            className={styles.label}
                            htmlFor={String(idx)}
                        >
                            {room.type_of_room}
                        </label>
                    </div>
                )
                )}
            </div>
        </>)
    } else return (<></>)
}

export default radioButtons