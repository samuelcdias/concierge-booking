
import { roomProps } from "../interfaces/RoomInterfaces"
import styles from "../styles/components/img.module.css"

interface showImgProps {
    condition: string,
    listOf: roomProps[],
    selected: string
}

export default function ShowImg({ condition, listOf, selected }: showImgProps) {
    function selectedInfo(rooms: any[], selected: any) {
        return rooms.find(room => room.type_of_room === selected)
    }

    if (condition !== "") {
        return (
            <div className={styles.content}>
                <img
                    className={styles.contentImg}
                    src={selectedInfo(listOf, selected).image_url}
                    alt="Quarto"
                />
            </div>
        )

    } else {
        return (<></>)
    }
}
