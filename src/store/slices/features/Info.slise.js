import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    info: {},
    isError: false,
    isSuccess: false,
    isLoading: true,
    message: '',
    appStoreLinl: "",
    googlePlayMarket: "GOOGLEPLAYMARKET",
    AppStoreMarket: "APPSTORE"
}

// InfoCustom 
export const InfoCustom = createAsyncThunk('info/cutom', async (thunkAPI) => {
    try {

    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}
)

export const infoSlice = createSlice({
    name: 'infoSclice',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(InfoCustom.pending, (state) => {
                state.isLoading = true
            })
            .addCase(InfoCustom.fulfilled, (state, action) => {
                state.isLoading = false
                state.info = action.payload
            })
            .addCase(InfoCustom.rejected, (state, action) => {
                state.isLoading = false
            })
    },
})

export const { reset } = infoSlice.actions
export default infoSlice.reducer
