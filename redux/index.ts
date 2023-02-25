import { configureStore } from '@reduxjs/toolkit'
import gamesReducer from './games/reducer'

export const store = configureStore({
    reducer: {
        games: gamesReducer,
    },
})
