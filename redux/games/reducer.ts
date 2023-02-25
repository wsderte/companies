const { createSlice } = require('@reduxjs/toolkit')

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        gamesArray: [],
    },
    reducers: {
        setCurrentGame: (
            state: { gamesArray: any },
            action: { payload: any }
        ) => {
            state.gamesArray = action.payload
        },
    },
})

export const { setCurrentGame } = gamesSlice.actions
export default gamesSlice.reducer
