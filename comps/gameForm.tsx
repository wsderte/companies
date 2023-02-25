import { Dispatch, memo, SetStateAction } from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { IApiData } from '../interface/data.interface'
import styles from '../styles/Home.module.css'

interface IGameForm {
    handleClick: Dispatch<SetStateAction<boolean>>
    update: Dispatch<SetStateAction<IApiData>>
    handleDispatch: (data: IApiData) => void
}

const GameForm = ({ handleClick, update, handleDispatch }: IGameForm) => {
    const [company, setCompany] = useState<string>('Company1')
    const [game, setGame] = useState<string>('')
    const [cost, setCost] = useState<number>(0)
    const [currency, setCurrency] = useState<string>('USD')

    const createGame = async (event: {
        preventDefault: () => void
    }): Promise<void> => {
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

        const data = await res
            .json()
            .then((response: { data: IApiData }): void => {
                setGame('')
                setCost(0)
                setCurrency('USD')
                update(() => response.data)
                handleDispatch(response.data)
            })

        // console.log('GameForm => CreateGame')
    }

    return (
        <Form
            onSubmit={(event) => createGame(event)}
            className={styles.formBox}
        >
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
                onClick={() => handleClick(false)}
            >
                Cancel
            </Button>
        </Form>
    )
}

export default memo(GameForm)
