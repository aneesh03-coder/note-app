import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {  
  status: 'idle',  
};

export const registerUser=createAsyncThunk(
    'USER/REGISTRATION',
    async(userRegistrationData,{dispatch,rejectWithValue})=>{
        const {name,pic,email,password}=userRegistrationData;
        const config={
            headers:{
                "Content-Type": "application/json"
            },
        };
        try{
            const endpoint=process.env.REACT_APP_REGISTRATION_ENDPOINT || `/api/users`;
            const {data}=await axios.post(
                endpoint,
                {name,pic,email,password},
                config
              )

           localStorage.setItem("userInfo",JSON.stringify(data));
            return data;
        }catch(err){
            const message=err.response && err.response.data.message ? err.response.data.message :err.message;
            return rejectWithValue(message);
        }
        
    }
)

export const userRegistrationSlice = createSlice({
    name: 'userRegistration',
    initialState,
    reducers: {
      statusDone:(state,action)=>{
        state.status=action.payload;
      },  
    }, 
    
  
     
    
  });
  
  export const { statusDone} = userRegistrationSlice.actions;
  
  export const selectuserInfo = (state) => state.userRegistration;
  
  export default userRegistrationSlice.reducer;