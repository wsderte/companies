import router from 'next/router'
import { useState, useEffect, SetStateAction } from 'react'
// import axios from 'axios'
import { Form, Button, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import styles from '../styles/Home.module.css'

const GameTable = ({ handleDispatch }: any) => {
    const items = useSelector((state: any) => state.games.gamesArray)

    const createPayDate = async (bill: any) => {
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
        await res.json().then((response: { data: any }) => {
            console.log(response.data, 'res 22222')
            handleDispatch(response.data)
        })

        console.log('Routing')
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Номер рахунку</th>
                    <th>Компанія</th>
                    <th>Назва гри</th>
                    <th>Сума оплати</th>
                    <th>Валюта</th>
                    <th>Дата Створення</th>
                    <th>Дата оплати</th>
                </tr>
            </thead>
            <tbody>
                {/* {accounts ? accounts : null} */}
                {items.map((data: any) => (
                    <tr key={data._id}>
                        <td>{data.id}</td>
                        <td>{data.company}</td>
                        <td>{data.game}</td>
                        <td>{data.cost}</td>
                        <td>{data.currency}</td>
                        <td>{data.createDate}</td>
                        <td>
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
export default GameTable
