import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { registerUser } from './userRegistrationSlice';
const initialUser=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null;

const initialState = {
  
  status: 'idle',
  loading: false,
  error:null,
  userInfo: initialUser,
  success:false,
};




export const login=createAsyncThunk(
  'POST/API/USERS/LOGIN',
  async (userEmailandPassword,{dispatch,getState,rejectWithValue})=>{   
    const {email,password}=userEmailandPassword;
    try{ 
          
      const config={
        headers:{
          "Content-Type": "application/json",
        },
      };
      const {data}=await axios.post(
        "http://192.168.1.119:5001/api/users/login",
        {email,password},
        config
      )
      dispatch(statusDone("It is done"))
      localStorage.setItem("userInfo",JSON.stringify(data));
        // dispatch(userLoginSuccess(data));
        return data;
       
    }catch(err){
      
      const message= err.response && err.response.data.message ? err.response.data.message :err.message
      return rejectWithValue(message);
    }
  }
)


export const loggingOut =createAsyncThunk(
  'POST/LOGOUT',
  async (dispatch)=>{ 

      try{
        localStorage.removeItem("userInfo");
        return []; 
      }catch(err){
        return err;
      }
      
      
  }
)

export const updateProfile=createAsyncThunk(
  'POST/api/users/profile',
  async (payload,{dispatch,getState,rejectWithValue})=>{
    try{
      const {user}=payload;
      const {userInfo}=getState().userLogin;
      const config={
        headers:{
            'Authorization':`Bearer ${userInfo.token}`,
            'Content-Type' : 'application/json; charset=UTF-8',
        },          
    };
    const {data}=await axios.post(`http://192.168.1.119:5001/api/users/profile`,user,config);
    localStorage.setItem("userInfo",JSON.stringify(data));
        return data;
    }catch(err){
      const message= err.response && err.response.data.message ? err.response.data.message :err.message
      return rejectWithValue(message);
    }
  }
)

export const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    statusDone:(state,action)=>{
      state.status=action.payload;
    },  
   
  }, 
  extraReducers:{
    [login.pending]:(state,action)=>{
      state.loading=true;
    },
    [login.fulfilled]:(state,action)=>{
      state.error=null;
      state.loading=false;
      state.userInfo=action.payload;
    },
    [login.rejected]:(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    },
    [loggingOut.pending]:(state,action)=>{
      state.loading=true;
    },
    [loggingOut.fulfilled]:(state,action)=>{
      state.error=null;
      state.userInfo=null;
      state.loading=false;
    },
    [loggingOut.rejected]:(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    },
    [registerUser.pending]:(state,action)=>{
      state.loading=true;
    },
    [registerUser.fulfilled]:(state,action)=>{
      state.error=null;
      state.loading=false;
      state.userInfo=action.payload;
    },
    [registerUser.rejected]:(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    },
    [updateProfile.pending]:(state,action)=>{
      state.loading=true;
    },
    [updateProfile.fulfilled]:(state,action)=>{
      state.error=null;
      state.loading=false;
      state.userInfo=action.payload;
      state.success=true;
    },
    [updateProfile.rejected]:(state,action)=>{
      state.loading=false;
      state.error=action.payload;
      state.success=false;
    },
 

   
  }
});

export const { userLogout,statusDone} = userLoginSlice.actions;

export const selectuserInfo = (state) => state.userLogin;

export default userLoginSlice.reducer;
