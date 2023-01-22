import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import axios from '../../../api/axios'

const initialState = {
    comments: {},
}

export const fetchComments = createAsyncThunk('comments/fetchComments', async (productId) => {
    const res = await axios.get(`/comment/${productId}`)
    return { comments: res.data.comments, productId: productId }
})

export const addComment = createAsyncThunk('comments/addComment', async (values) => {
    const res = await axios.post('/comment', values)
    return { comment: res.data.comment, productId: values.productId }
})

export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId) => {
    const res = await axios.delete(`/comment/${commentId}`)
    return { commentId: res.data.commentId, productId: res.data.productId }
})

export const fetchFilteredComments = createAsyncThunk('comments/fetchFilteredComments', async (values) => {
    const res = await axios.post(`/comment/${values.productId}`, values)
    return { comments: res.data.comments, productId: values.productId }
})

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchComments.fulfilled, (state, action) => {
                if (action.payload.comments === undefined) action.payload.comments = []
                state.comments[action.payload.productId] = [...action.payload.comments]
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.comments[action.payload.productId].push(action.payload.comment)
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments[action.payload.productId] = state.comments[action.payload.productId].filter(comment => comment._id !== action.payload.commentId)
            })
            .addCase(fetchFilteredComments.fulfilled, (state, action) => {
                if (action.payload.comments === undefined) action.payload.comments = []
                state.comments[action.payload.productId] = [...action.payload.comments]
            })
    }

})

export const selectComments = state => state.comments.comments

export const selectCommentsById = productId => createSelector(selectComments, comments => comments[productId])

export default commentsSlice.reducer