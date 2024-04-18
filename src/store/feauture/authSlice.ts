import { IAuthSlice } from '@/utils/interface'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState : IAuthSlice = {
    isLogin : false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    loginSuccess : (state)=>{
        state.isLogin = true;
    },

    logout:(state)=>{
        state.isLogin = true;
    },

    increment: (state) => {      
    },
    
    incrementByAmount: (state, action: PayloadAction<number>) => {      
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, incrementByAmount } = authSlice.actions

export default authSlice.reducer