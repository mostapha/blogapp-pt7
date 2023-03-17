import { createSlice } from '@reduxjs/toolkit'

const initialValue = null
const slice = createSlice({
  name: 'user', //
  initialState: initialValue,
  reducers: {
    setUserAction(state, action){
      return action.payload
    },
    clearUserAction() {
      return initialValue
    }
  },
})

export const { setUserAction, clearUserAction } = slice.actions

export default slice.reducer