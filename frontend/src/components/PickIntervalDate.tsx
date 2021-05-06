import { Col, Row } from "react-bootstrap"
import PickDate from "./selectDate"

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
        <Row lg={4} md={2}>
            <Col className="text-center" lg={{ span: 3, offset: 3 }}>

                <PickDate
                    selected="start"
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />

            </Col>

            <Col className="text-center" lg={{ span: 3 }}>
                <PickDate
                    selected="end"
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            </Col>
        </Row>
    )
}