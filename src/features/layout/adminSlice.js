import { createSlice } from '@reduxjs/toolkit'

const initialState = { active: false }

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminSwitch(state, _action) {
            state.active = (!state.active)
        }
    }
})

export const selectAdmin = state => state.admin.active

export const { adminSwitch } = adminSlice.actions

export default adminSlice.reducer