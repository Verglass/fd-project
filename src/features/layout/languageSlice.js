import { createSlice } from '@reduxjs/toolkit'

const initialState = { polish: false }

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        languageSwitch(state, _action) {
            state.polish = (!state.polish)
        }
    }
})

export const selectLanguage = state => state.language.polish

export const { languageSwitch } = languageSlice.actions

export default languageSlice.reducer