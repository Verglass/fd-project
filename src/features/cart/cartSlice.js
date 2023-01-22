import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import axios from '../../../api/axios'

const initialState = {
    cart: [],
    userToken: nanoid(),
}

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userToken) => {
    const res = await axios.get(`/cart/${initialState.userToken}`)
    return [...res.data.cart]
})

export const addProductToCart = createAsyncThunk('cart/addProductToCart', async (values) => {
    const res = await axios.post('/cart', values)
    return res.data.cart
})

export const deleteProductFromCart = createAsyncThunk('cart/deleteProductFromCart', async (cartId) => {
    await axios.delete(`/cart/${cartId}`)
    return cartId
})

export const updateProductFromCart = createAsyncThunk('cart/updateProductFromCart', async (values) => {
    const res = await axios.put(`/cart/${values.cartId}`, values)
    return res.data
})

export const clearCart = createAsyncThunk('cart/clear', async () => {
    await axios.delete(`/cart/clear/${initialState.userToken}`)
    return []
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cart = action.payload
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                const cart = state.cart.find(cart => cart._id === action.payload._id)
                if (cart) {
                    cart.quantity = action.payload.quantity
                } else {
                    state.cart.push(action.payload)
                }
            })
            .addCase(deleteProductFromCart.fulfilled, (state, action) => {
                state.cart = state.cart.filter(product => product._id !== action.payload)
            })
            .addCase(updateProductFromCart.fulfilled, (state, action) => {
                state.cart = state.cart.map(cart => {
                    if (cart._id === action.payload.cartId) cart.quantity = action.payload.quantity
                    return cart
                })
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.cart = action.payload
            })
    }
})

export const selectCart = state => state.cart.cart
export const selectUserToken = state => state.cart.userToken

export default cartSlice.reducer