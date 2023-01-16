import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import axios from '../../../api/axios'

const initialState = {
    scores: {},
    avg: {},
}

export const fetchScores = createAsyncThunk('scores/fetchScores', async (productId) => {
    const res = await axios.get(`/score/${productId}`)
    const resAvg = await axios.get(`/score/${productId}/avg`)
    return { scores: res.data.scores, avg: resAvg.data.avgScore, productId: productId }
})

export const addScore = createAsyncThunk('scores/addScore', async (values) => {
    const res = await axios.post('/score', values)
    const resAvg = await axios.get(`/score/${values.productId}/avg`)
    return { score: res.data.score, avg: resAvg.data.avgScore, productId: values.productId }
})

export const deleteScore = createAsyncThunk('scores/deleteScore', async (scoreId) => {
    const res = await axios.delete(`/score/${scoreId}`)
    const resAvg = await axios.get(`/score/${res.data.productId}/avg`)
    return { scoreId: res.data.scoreId, avg: resAvg.data.avgScore, productId: res.data.productId }
})

const scoresSlice = createSlice({
    name: 'scores',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchScores.fulfilled, (state, action) => {
                if (action.payload.scores === undefined) action.payload.scores = []
                state.scores[action.payload.productId] = [...action.payload.scores]
                state.avg[action.payload.productId] = action.payload.avg
            })
            .addCase(addScore.fulfilled, (state, action) => {
                state.scores[action.payload.productId].push(action.payload.score)
                state.avg[action.payload.productId] = action.payload.avg
            })
            .addCase(deleteScore.fulfilled, (state, action) => {
                state.scores[action.payload.productId] = state.scores[action.payload.productId].filter(score => score._id !== action.payload.scoreId)
                state.avg[action.payload.productId] = action.payload.avg
            })
    }

})

export const selectScores = state => state.scores.scores
export const selectAvg = state => state.scores.avg

export const selectScoresById = productId => createSelector(selectScores, scores => scores[productId])
export const selectAvgScoreById = productId => createSelector(selectAvg, avg => avg[productId])

export default scoresSlice.reducer