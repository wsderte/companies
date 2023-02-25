import { MongoClient } from 'mongodb'

// if (!process.env.MONGODB_URI) {
//     throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
// }

//let apiKey = wsPB2JUKKEcNfFcCgzA8uIXjlI8ss11c7wc80504Dj5Z3giu6rih3B4OOX8yaGRU
// let local = 'mongodb://localhost:27017/companies'
const accessUri =
    'mongodb+srv://ascellanova:zaqwer54321@cluster0.v3hns.mongodb.net/myFirstDatabase?authMechanism=DEFAULT'

const uri = accessUri

// 'mongodb://https://eu-central-1.aws.data.mongodb-api.com/app/data-brhhy/endpoint/data/v1'

// process.env.MONGODB_URI

const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
