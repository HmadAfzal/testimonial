import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { User } from '@/schemas/userSchema'

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    removeUser: (state) => {
      state.user = null
    },
  },
})

export const { initializeUser, removeUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer
