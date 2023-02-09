import Button, { ButtonLabel } from "../Button"
import Flexbox from "../FlexBox"

export default function Footer({ addBtnClickHandler }) {
    return (
        <footer className="footer">
            <Flexbox align="center" justify="end" className="container">
                <Button variant="secondary" className="ml-auto" >
                    <ButtonLabel label="Continue" />
                </Button>
                <Button style={{ "--ml": 5 }} onClick={() => { addBtnClickHandler() }}>
                    <ButtonLabel label="Add Test" />
                </Button>

            </Flexbox>
        </footer>
    )
}

