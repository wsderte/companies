import clientPromise from '../../../lib/mongodb'
import { Collection } from 'mongodb'

export default async function getGames(req: any, res: any) {
    try {
        const client = await clientPromise
        const db: Collection = client.db().collection('companies')
        console.log('CONNECTED TO MONGO')

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
