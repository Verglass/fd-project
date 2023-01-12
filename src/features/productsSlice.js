import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productAdded(state, action) {
            state.push(action.payload)
        },
        productsSet(state, action) {
            state = action.payload
        }
    }
})

export const selectAllProducts = state => state.products

export const { productAdded, productsSet } = productsSlice.actions

export default productsSlice.reducer