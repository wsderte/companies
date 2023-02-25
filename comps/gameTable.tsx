import { memo } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { IApiData } from '../interface/data.interface'

import styles from '../styles/Home.module.css'

interface IGameTable {
    handleDispatch: (data: IApiData) => void
}

interface GamesState {
    gamesArray: Array<IApiData>
}

interface RootState {
    games: GamesState
}

const GameTable = ({ handleDispatch }: IGameTable) => {
    const items = useSelector((state: RootState) => state.games.gamesArray)

    const createPayDate = async (bill: IApiData): Promise<void> => {
        // console.log(bill, 'Item payDate')
        const res = await fetch('/api/game/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: bill.id,
            }),
        })
        await res.json().then((response: { data: IApiData }): void => {
            handleDispatch(response.data)
        })
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr className={styles.tableLabel}>
                    <th>Номер рахунку</th>
                    <th>Компанія</th>
                    <th>Назва гри</th>
                    <th>Сума оплати</th>
                    <th>Валюта</th>
                    <th className={styles.tableLabel}>Дата Створення</th>
                    <th>Дата оплати</th>
                </tr>
            </thead>
            <tbody>
                {items.map((data: any) => (
                    <tr key={data._id} className={styles.tableLabel}>
                        <td className={styles.tableLabel}>{data.id}</td>
                        <td className={styles.tableLabel}>{data.company}</td>
                        <td className={styles.tableLabel}>{data.game}</td>
                        <td className={styles.tableLabel}>{data.cost}</td>
                        <td className={styles.tableLabel}>{data.currency}</td>
                        <td className={styles.tableLabel}>{data.createDate}</td>
                        <td className={styles.tableLabelPayDate}>
                            {data?.payDate ? (
                                data.payDate
                            ) : (
                                <Button
                                    color="dark"
                                    className={styles['btn-pill']}
                                    onClick={() => createPayDate(data)}
                                >
                                    Рахунок оплачений
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
export default memo(GameTable)
