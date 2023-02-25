// import { Collection } from 'mongodb'
import { IApiData } from '../../../interface/data.interface'
import { GetDate } from '../../../lib/getDate'
import clientPromise from '../../../lib/mongodb'

interface Request {
    body: IApiData
}

interface Response {
    status(arg0: number): any
    message: string
    data: IApiData
}

export default async function addGame(
    req: Request,
    res: Response
): Promise<void> {
    const { company, game, cost, currency, payDate } = req.body
    const createDate = GetDate()
    const paydate = payDate ? payDate : null
    try {
        const client = await clientPromise
        const db = client.db().collection('companies')
        console.log('CONNECTED TO MONGO')

        const dbCounters = client.db('companies').collection('counters')

        const a = await dbCounters.find({}).toArray()

        if (a[0]) {
            console.log('winni')
        } else {
            await dbCounters.insertOne({ id: 'productid', seq: 0 })
        }

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
