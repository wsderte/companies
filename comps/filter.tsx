import { useState, useEffect, memo } from 'react'
import { Form } from 'react-bootstrap'
import styles from '../styles/Home.module.css'
import { IApiData } from './../interface/data.interface'

interface IFilter {
    companies: IApiData
    handleDispatch: (data: IApiData) => void
}

const Filter = ({ companies, handleDispatch }: IFilter) => {
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

            const filtered: any = companies.filter(
                (data: IApiData): boolean => {
                    return selectedFilterArr.includes(data.company)
                }
            )
            // console.log(filtered)
            // handleClick(filtered)
            handleDispatch(filtered)
        } else {
            // handleClick(companies)
            handleDispatch(companies)
        }
    }, [company])

    const onSwitchAction1 = (): void => {
        setCompany((prevState) => ({
            ...prevState,
            company1: !prevState.company1,
        }))
    }
    const onSwitchAction2 = (): void => {
        setCompany((prevState) => ({
            ...prevState,
            company2: !prevState.company2,
        }))
    }
    const onSwitchAction3 = (): void => {
        setCompany((prevState) => ({
            ...prevState,
            company3: !prevState.company3,
        }))
    }

    return (
        <Form>
            <div className="mb-3">
                <Form.Check
                    className={styles.switch}
                    id="switchEnabled"
                    type="switch"
                    label="Company1"
                    checked={company.company1}
                    onChange={onSwitchAction1}
                />
                <Form.Check
                    className={styles.switch}
                    type="switch"
                    id="custom-switch2"
                    label="Company2"
                    checked={company.company2}
                    onChange={onSwitchAction2}
                />
                <Form.Check
                    className={styles.switch}
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
export default memo(Filter)
