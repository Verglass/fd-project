import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import axios from '../../../api/axios'

const initialState = {
    details: {},
}

export const fetchDetails = createAsyncThunk('details/fetchDetails', async (productId) => {
    const res = await axios.get(`/products/${productId}`)
    return { details: res.data.product, productId: productId }
})

const productDetailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchDetails.fulfilled, (state, action) => {
                state.details[action.payload.productId] = action.payload.details
            })
    }

})

export const selectProductDetails = state => state.details.details

export const selectProductDetailsById = productId => createSelector(selectProductDetails, details => details[productId])

export default productDetailsSlice.reducer