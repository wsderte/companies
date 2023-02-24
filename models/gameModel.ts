import { Schema, model, models } from 'mongoose'

const gameSchema = new Schema(
    {
        company: {
            type: String,
            // required: true,
        },
        // game: {
        //     type: String,
        //     // required: true,
        // },
        // cost: {
        //     type: Number,
        //     // required: true,
        // },
        // currency: {
        //     type: String,
        //     // required: true,
        // },
        // createDate: {
        //     type: String,
        // },
        // payDate: {
        //     type: String,
        // },
    },
    {
        timestamps: true,
    }
)

const Game = models.Game || model('Game', gameSchema) // create model if it's not exist

export default Game
