import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
// import axios from 'axios'
import { Form, Button, Table } from 'react-bootstrap'

import styles from '../styles/Home.module.css'

const Filter = ({ companies, handleClick }: any) => {
    const [company, setCompany] = useState({
        company1: false,
        company2: false,
        company3: false,
    })

    useEffect(() => {
        if (company.company1 || company.company2 || company.company3) {
            let selectedFilterArr: string[] = []

            if (company.company1) selectedFilterArr.push('Company1')
            if (company.company2) selectedFilterArr.push('Company2')
            if (company.company3) selectedFilterArr.push('Company3')

            let filtered = companies.filter((data: any) => {
                return selectedFilterArr.includes(data.company)
            })
            // console.log(filtered)
            handleClick(filtered)
        } else {
            handleClick(companies)
        }
    }, [company])

    const onSwitchAction1 = () => {
        setCompany((prevState) => ({
            ...prevState,
            company1: !prevState.company1,
        }))
    }
    const onSwitchAction2 = () => {
        setCompany((prevState) => ({
            ...prevState,
            company2: !prevState.company2,
        }))
    }
    const onSwitchAction3 = () => {
        setCompany((prevState) => ({
            ...prevState,
            company3: !prevState.company3,
        }))
    }

    return (
        <Form>
            <div className="mb-3">
                <Form.Check
                    id="switchEnabled"
                    type="switch"
                    label="Company1"
                    checked={company.company1}
                    onChange={onSwitchAction1}
                />
                <Form.Check
                    type="switch"
                    id="custom-switch2"
                    label="Company2"
                    checked={company.company2}
                    onChange={onSwitchAction2}
                    // onChange={(event) => handleClick2(event)}
                />
                <Form.Check
                    type="switch"
                    id="custom-switch3"
                    label="Company3"
                    checked={company.company3}
                    onChange={onSwitchAction3}
                />
            </div>
        </Form>
    )
}
export default Filter
