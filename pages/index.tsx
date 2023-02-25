import Head from 'next/head'
import { InferGetServerSidePropsType } from 'next'

import clientPromise from '../lib/mongodb'

import styles from '../styles/Home.module.css'

import GameForm from '../comps/gameForm'
import GameTable from '../comps/gameTable'

import { useEffect, useState } from 'react'
import Filter from '../comps/filter'

import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from '../redux'
import { setCurrentGame } from '../redux/games/reducer'
import { Table } from 'react-bootstrap'

export async function getServerSideProps() {
    try {
        const client = await clientPromise
        const db = client.db('companies')

        const companiesList = await db
            .collection('companies')
            .find({})
            .toArray()

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
    // const [filteredData, setFilteredData] = useState(companies)
    // ***************
    const dispatch = useDispatch()
    const items = useSelector((state: any) => state.games.gamesArray)
    // ***************
    useEffect(() => {
        dispatch(setCurrentGame(companies))
    }, [companies])

    const handleDispatch = (data: any) => {
        dispatch(setCurrentGame(data))
    }

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
                        handleDispatch={handleDispatch}
                    />
                ) : (
                    <button
                        className={styles['btn-pill']}
                        onClick={() => setIsVisible(true)}
                    >
                        Create Test
                    </button>
                )}

                <Filter
                    companies={data}
                    // handleClick={setFilteredData}
                    handleDispatch={handleDispatch}
                />

                <GameTable
                    // companies={filteredData ? filteredData : data}
                    companies={data}
                    handleDispatch={handleDispatch}
                />
            </main>
        </div>
    )
}
