const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users')
//         .then((response) => response.json())
//         .then((data) => data)
//     console.log(response)
//     return response
// })

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
    // extraReducers: (builder: any) => {
    //     builder.addCase(
    //         fetchUsers.fulfilled,
    //         (state: any, action: { payload: any }) => {
    //             return action.payload
    //         }
    //     )
    // },
})

export const { setCurrentGame } = gamesSlice.actions
export default gamesSlice.reducer
