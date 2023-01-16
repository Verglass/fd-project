import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice'
import adminReducer from '../features/layout/adminSlice'
import scoresReducer from '../features/scores/scoresSlice'
import commentsReducer from '../features/comments/commentsSlice'
import productDetailsReducer from '../features/productDetails/productDetailsSlice'
import deliveryOptionsReducer from '../features/deliveryOptions/deliveryOptionsSlice'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        admin: adminReducer,
        scores: scoresReducer,
        comments: commentsReducer,
        details: productDetailsReducer,
        deliveryOptions: deliveryOptionsReducer,
    }
})