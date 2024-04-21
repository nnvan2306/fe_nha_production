import { IAuthSlice } from '@/utils/interface'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState : IAuthSlice = {
    isLogin : false,
    name :'',
    userId:0,
    color:0,
    
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    loginSuccess : (state, action: PayloadAction<IAuthSlice>)=>{
      
      let stateNew = {...state};

      stateNew.isLogin = true;
      stateNew.name = action.payload.name;
      stateNew.userId = action.payload.userId;
      stateNew.color = action.payload.color;

      return stateNew;
    },

    logout:(state)=>{
      let stateNew = {...state};

      stateNew.isLogin = false;
      stateNew.name = '';
      stateNew.userId =0;
      stateNew.color=0;
      
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