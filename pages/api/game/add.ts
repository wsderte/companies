import { Collection } from 'mongodb'
import { GetDate } from '../../../lib/getDate'
import clientPromise from '../../../lib/mongodb'

export default async function addGame(req: any, res: any) {
    const { company, game, cost, currency, payDate } = req.body
    const createDate = GetDate()
    const paydate = payDate ? payDate : null
    try {
        const client = await clientPromise
        const db: Collection = client.db().collection('companies')
        console.log('CONNECTED TO MONGO')

        // console.log(company)
        // const testDoc = await Game.create({ company })
        // await testDoc.save()
        // db.insertOne({ id: 'productid', seq: 0 })

        const dbCounters: Collection = client.db().collection('counters')
        // await dbCounters.insertOne({ id: 'productid', seq: 0 })
        await dbCounters.findOneAndUpdate(
            { id: 'productid' },
            { $inc: { seq: 1 } }
        )

        const counter = await dbCounters.find({}).toArray()
        // console.log(counter[0].seq)

        await db.insertOne({
            company,
            game,
            cost,
            currency,
            createDate,
            payDate: paydate,
            id: counter[0].seq,
        })

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
