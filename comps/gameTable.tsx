import { useState, useEffect, SetStateAction } from 'react'
// import axios from 'axios'
import { Form, Button, Table } from 'react-bootstrap'

import styles from '../styles/Home.module.css'

const GameTable = (companies: any, setShowNewForm: any) => {
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        setAccounts(companies.companies)
        // console.log(accounts)
        // HTTP запит до API для отримання списку компаній
        // fetch
        //     .get('/api/companies')
        //     .then((response: { data: SetStateAction<never[]> }) => {
        //         setCompanies(response.data)
        //     })
    }, [companies])

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
                {accounts.map((data: any) => (
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
                                    onClick={() => {}}
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
