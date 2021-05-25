import styles from "../styles/components/radioButtons.module.css"
import { ReservationFormProps } from "../interfaces/ReservationInterfaces"
import { roomProps } from "../interfaces/RoomInterfaces"
import FormGroup from "./FormGroup"

interface radioButtonsProps {
    hasData: boolean,
    state: ReservationFormProps,
    rooms: roomProps[],
    handleChange: any
}

function radioButtons({ hasData, state, rooms, handleChange }: radioButtonsProps) {
    if (hasData) {
        return (<>
            <FormGroup
                text="Escolha o quarto"
            >
                {rooms.map((room, idx: number) => (
                    <div className={styles.content}>
                        <input
                            className={styles.radioButtonInput}
                            id={String(idx)}
                            type="radio"
                            name={`roomSelected`}
                            checked={state.roomSelected === room.type_of_room}
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
            </FormGroup>
        </>)
    } else return (<></>)
}

export default radioButtons