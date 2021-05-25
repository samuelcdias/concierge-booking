import PickDate, { selectedList } from "./selectDate"
import styles from "../styles/components/fields.module.css"

interface pickIntervalDateProps {
    startDate: Date,
    endDate: Date,
    setStartDate: any,
    setEndDate: any
}

export default function PickIntervalDate({
    startDate,
    endDate,
    setStartDate,
    setEndDate }: pickIntervalDateProps) {
    return (
        <div className={styles.displayLine}>

            <div className={styles.pickDateNormalizer}>
                <PickDate
                    selected={selectedList.START}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            </div>
            <div className={styles.pickDateNormalizer}>
                <PickDate
                    selected={selectedList.END}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            </div>
        </div >
    )
}