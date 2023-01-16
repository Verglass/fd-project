import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../api/axios'

const initialState = {
    deliveryOptions: [],
}

export const fetchDeliveryOptions = createAsyncThunk('comments/fetchDeliveryOptions', async () => {
    const res = await axios.get(`/delivery`)
    return [...res.data.deliveryOptions]
})

export const addDeliveryOption = createAsyncThunk('comments/addDeliveryOption', async (values) => {
    const res = await axios.post('/delivery', values)
    return res.data.deliveryOption
})

export const deleteDeliveryOption = createAsyncThunk('comments/deleteDeliveryOption', async (deliveryOptionId) => {
    const res = await axios.delete(`/delivery/${deliveryOptionId}`)
    return res.data.deliveryId
})


const deliveryOptionsSlice = createSlice({
    name: 'deliveryOptions',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchDeliveryOptions.fulfilled, (state, action) => {
                state.deliveryOptions = action.payload
            })
            .addCase(addDeliveryOption.fulfilled, (state, action) => {
                state.deliveryOptions.push(action.payload)
            })
            .addCase(deleteDeliveryOption.fulfilled, (state, action) => {
                state.deliveryOptions = state.deliveryOptions.filter(deliveryOption => deliveryOption._id !== action.payload)
            })
    }

})

export const selectDeliveryOptions = state => state.deliveryOptions.deliveryOptions

export default deliveryOptionsSlice.reducer