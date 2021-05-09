import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface pickDateProps {
    selected?: selectedList
    startDate: Date,
    endDate: Date,
    setStartDate: any,
    setEndDate: any
}
export enum selectedList {
    START = "start",
    END = "end",
    ONE = "one"
}

function PickDate({ selected, startDate, endDate, setStartDate, setEndDate }: pickDateProps) {
    switch (selected) {
        case selectedList.START:
            return (
                <DatePicker
                    selected={startDate}
                    dateFormat="dd/MM/yyyy"
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    onChange={(date: Date) => setStartDate(date)}
                />
            )
        case selectedList.END:
            return (
                <DatePicker
                    selected={endDate}
                    dateFormat="dd/MM/yyyy"
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    onChange={(date: Date) => setEndDate(date)}
                />
            )
        default:
            return (
                <DatePicker
                    selected={startDate}
                    dateFormat="dd/MM/yyyy"
                    endDate={new Date()}
                    onChange={(date: Date) => setEndDate(date)}
                />
            )
    }
}

export default PickDate
