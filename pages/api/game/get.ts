import { IApiData } from '../../../interface/data.interface'
import clientPromise from '../../../lib/mongodb'
// import { Collection } from 'mongodb'

interface Response {
    status(arg0: number): any
    message: string
    data: IApiData
}

export default async function getGames(res: Response): Promise<void> {
    try {
        const client = await clientPromise
        const db = client.db().collection('companies')
        // console.log('CONNECTED TO MONGO')

        // console.log(company)
        // const testDoc = await Game.create({ company })
        // await testDoc.save()

        const companiesList = await db.find({}).toArray()

        res.status(201).json({
            message: 'POST request successful!',
            data: companiesList,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
