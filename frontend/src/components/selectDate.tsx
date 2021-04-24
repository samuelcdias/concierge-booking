import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface pickDateProps {
    selected: "start" | "end",
    startDate: Date,
    endDate: Date,
    setStartDate: any,
    setEndDate: any
}

function PickDate({ selected, startDate, endDate, setStartDate, setEndDate }: pickDateProps) {

    return (
        <>
            {(selected === "start") ?
                (
                    <DatePicker
                        selected={startDate}
                        dateFormat="dd/MM/yyyy"
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        onChange={(date: Date) => setStartDate(date)}
                    />
                ) : (
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
            }
        </>
    )
}

export default PickDate
