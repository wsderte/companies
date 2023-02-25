const { createSlice } = require('@reduxjs/toolkit')
import { IApiData } from './../../interface/data.interface'

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        gamesArray: [],
    },
    reducers: {
        setCurrentGame: (
            state: { gamesArray: IApiData },
            action: { payload: IApiData }
        ) => {
            state.gamesArray = action.payload
        },
    },
})

export const { setCurrentGame } = gamesSlice.actions
export default gamesSlice.reducer
