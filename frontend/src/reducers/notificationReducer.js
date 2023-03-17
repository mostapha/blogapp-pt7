import { createSlice } from '@reduxjs/toolkit'

// create slice
const initialValue = ''
const slice = createSlice({
  name: 'notification', // <-- any name
  initialState: initialValue, // <-- initial state
  reducers: {
    setNotification(state, action){
      return action.payload
    },
    clearNotification() {
      return initialValue
    }
  },
})

// make action available (include export to make it available globally)
export const { setNotification, clearNotification } = slice.actions

export default slice.reducer