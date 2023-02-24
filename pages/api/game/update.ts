import clientPromise from '../../../lib/mongodb'
import { Collection } from 'mongodb'
import { GetDate } from '../../../lib/getDate'

export default async function updateGames(req: any, res: any) {
    const { id } = req.body
    const payDate = GetDate()

    try {
        const client = await clientPromise
        const db: Collection = client.db().collection('companies')

        db.findOneAndUpdate({ id: id }, { $set: { payDate: payDate } })

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
