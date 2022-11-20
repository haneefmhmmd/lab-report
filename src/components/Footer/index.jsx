import Button, { ButtonLabel } from "../Button"
import Flexbox from "../FlexBox"

export default function Footer() {
    return (
        <footer className="footer" style={{ "--mt": 5 }}>
            <Flexbox align="center" className="container">
                <Button variant="secondary" className="ml-auto">
                    <ButtonLabel label="Back" />
                </Button>
                <Button style={{ "--ml": 5 }}>
                    <ButtonLabel label="Create Report" />
                </Button>
            </Flexbox>
        </footer>
    )
}

