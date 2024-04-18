import { IAuthSlice } from '@/utils/interface'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState : IAuthSlice = {
    isLogin : false,
    name :''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    loginSuccess : (state, action: PayloadAction<IAuthSlice>)=>{
      
      let stateNew = {...state};

      stateNew.isLogin = true;
      stateNew.name = action.payload.name;

      return stateNew;
    },

    logout:(state)=>{
      let stateNew = {...state};

      stateNew.isLogin = false;
      stateNew.name = '';
      
      return stateNew;
    },

    increment: (state) => {      
    },
    
    incrementByAmount: (state, action: PayloadAction<number>) => {      
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, incrementByAmount , loginSuccess , logout} = authSlice.actions

export default authSlice.reducer