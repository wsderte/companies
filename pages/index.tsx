import Head from 'next/head'
import { InferGetServerSidePropsType } from 'next'

import clientPromise from '../lib/mongodb'

import styles from '../styles/Home.module.css'

import GameForm from '../comps/gameForm'
import GameTable from '../comps/gameTable'

import { useState } from 'react'
import Filter from '../comps/filter'

export async function getServerSideProps() {
    try {
        const client = await clientPromise
        const db = client.db('companies')

        const companiesList = await db
            .collection('companies')
            .find({})
            .toArray()

        // console.log(companiesList)

        return {
            props: { companies: JSON.parse(JSON.stringify(companiesList)) },
        }
    } catch (e) {
        console.error(e)
        return {
            props: { errorMassage: e },
            revalidate: 0,
        }
    }
}

export default function Home({
    companies,
    errorMassage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [isVisible, setIsVisible] = useState(false)
    const [data, setData] = useState(companies)
    const [filteredData, setFilteredData] = useState(companies)
    if (errorMassage) {
        return <div>Some server problems</div>
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                {isVisible ? (
                    <GameForm
                        companies={data}
                        handleClick={setIsVisible}
                        update={setData}
                    />
                ) : (
                    <button
                        className={styles['btn-pill']}
                        onClick={() => setIsVisible(true)}
                    >
                        Create Test
                    </button>
                )}

                <Filter companies={data} handleClick={setFilteredData} />

                <GameTable
                    companies={filteredData ? filteredData : data}
                    setShowNewForm={() => {}}
                />
            </main>
        </div>
    )
}
