import clientPromise from '../../../lib/mongodb'
import { GetDate } from '../../../lib/getDate'
import { IApiData } from '../../../interface/data.interface'

interface Request {
    body: IApiData
}

interface Response {
    status(arg0: number): any
    message: string
    data: IApiData
}

export default async function updateGames(
    req: Request,
    res: Response
): Promise<void> {
    const { id } = req.body
    const payDate = GetDate()

    try {
        const client = await clientPromise
        const db = client.db().collection('companies')

        await db.findOneAndUpdate({ id: id }, { $set: { payDate: payDate } })

        const companiesList = await db.find({}).toArray()
        // console.log(companiesList, "array of companies")

        res.status(201).json({
            message: 'POST request successful!',
            data: companiesList,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
