import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../api/axios'

const initialState = {
    products: [],
    status: 'idle',
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const res = await axios.get('/products')
    return [...res.data.products]
})

export const addProduct = createAsyncThunk('products/addProduct', async (values) => {
    const res = await axios.post('/products', values)
    return res.data.product
})

export const fetchFilteredProducts = createAsyncThunk('products/fetchFilteredProducts', async (values) => {
    const res = await axios.post('/products/filter', values)
    return [...res.data.products]
})

export const updateProduct = createAsyncThunk('products/updateProduct', async (values) => {
    const res = await axios.put(`/products/${values.productId}`, values)
    return res.data.product
})

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
    const res = await axios.delete(`/products/${productId}`)
    return res.data.productId
})

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.status = 'succeeded'
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload)
            })
            .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.products = state.products.map(product => {
                    if (product._id === action.payload._id) product = action.payload
                    return product
                })
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product._id !== action.payload)
            })
    }

})

export const selectAllProducts = state => state.products.products
export const getProductsStatus = state => state.products.status

export default productsSlice.reducer