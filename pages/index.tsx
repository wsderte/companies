import Head from 'next/head'
import { InferGetServerSidePropsType } from 'next'

import clientPromise from '../lib/mongodb'

import styles from '../styles/Home.module.css'

import { useEffect, useState, lazy } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setCurrentGame } from '../redux/games/reducer'
import { IApiData } from '../interface/data.interface'

import GameForm from '../comps/gameForm'
// import Filter from '../comps/filter'
// import GameTable from '../comps/gameTable'

const Filter = lazy(() => import('../comps/filter'))
const GameTable = lazy(() => import('../comps/gameTable'))

export async function getServerSideProps() {
    try {
        const client = await clientPromise
        const db = client.db('')

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
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [data, setData] = useState<IApiData>(companies)
    // const [filteredData, setFilteredData] = useState(companies)

    const dispatch = useDispatch()

    useEffect(() => {
        // console.log(companies)
        dispatch(setCurrentGame(companies))
    }, [companies])

    const handleDispatch = (data: IApiData) => {
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
                        handleClick={setIsVisible}
                        update={setData}
                        handleDispatch={handleDispatch}
                    />
                ) : (
                    <div className={styles.btnBox}>
                        <button
                            className={styles.createBtn}
                            onClick={() => setIsVisible(true)}
                        >
                            Create Test
                        </button>
                    </div>
                )}

                <Filter
                    companies={data}
                    // handleClick={setFilteredData}
                    handleDispatch={handleDispatch}
                />

                <GameTable
                    // companies={filteredData ? filteredData : data}
                    // companies={data}
                    handleDispatch={handleDispatch}
                />
            </main>
        </div>
    )
}
