import { memo } from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import styles from '../styles/Home.module.css'

const GameForm = ({ handleClick, update, handleDispatch }: any) => {
    const [company, setCompany] = useState('Company1')
    const [game, setGame] = useState('')
    const [cost, setCost] = useState(0)
    const [currency, setCurrency] = useState('USD')

    const createGame = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        const res = await fetch('/api/game/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                company,
                game,
                cost,
                currency,
            }),
        })
        const data = await res.json().then((response: { data: any }) => {
            setGame('')
            setCost(0)
            setCurrency('USD')
            update(() => response.data)
            handleDispatch(response.data)
        })

        // console.log('GameForm => CreateGame')
    }

    return (
        <Form onSubmit={(event) => createGame(event)}>
            <Form.Group controlId="company">
                <Form.Label className={styles['label-wdth']}>
                    Компанія:
                </Form.Label>
                <Form.Control
                    className={styles.formControl}
                    as="select"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                >
                    <option className={styles.formSelect} value="Company1">
                        Company1
                    </option>
                    <option className={styles.formSelect} value="Company2">
                        Company2
                    </option>
                    <option className={styles.formSelect} value="Company3">
                        Company3
                    </option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="game">
                <Form.Label className={styles['label-wdth']}>
                    Назва гри:
                </Form.Label>
                <Form.Control
                    className={styles.formControl}
                    type="text"
                    placeholder="Введіть назву гри"
                    value={game}
                    onChange={(event) => setGame(event.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="cost">
                <Form.Label className={styles['label-wdth']}>
                    Сума оплати:
                </Form.Label>
                <Form.Control
                    className={styles.formControl}
                    type="number"
                    placeholder="Введіть суму оплати"
                    value={cost}
                    onChange={(event) => setCost(+event.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="currency">
                <Form.Label className={styles['label-wdth']}>
                    Валюта:
                </Form.Label>
                <Form.Control
                    className={styles.formControl}
                    as="select"
                    value={currency}
                    onChange={(event) => setCurrency(event.target.value)}
                >
                    <option className={styles.formSelect} value="USD">
                        Долари
                    </option>
                    <option className={styles.formSelect} value="EUR">
                        Євро
                    </option>
                </Form.Control>
            </Form.Group>

            <Button
                color="secondary"
                className={styles['btn-pill']}
                type="submit"
            >
                Створити новий рахунок
            </Button>
            <Button
                color="dark"
                className={styles['btn-pill']}
                onClick={() => handleClick()}
            >
                Cancel
            </Button>
        </Form>
    )
}

export default memo(GameForm)
