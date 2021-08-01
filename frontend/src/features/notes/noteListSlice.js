import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const initialState = {  
  status: 'idle',  
  loading:false,
  notes:[],
  error:null,
  success:false,
  createNoteError:null,
  updateLoading:false,
  updateSuccess:false,
  updateNoteError:null,
  deleteLoading:false,
  deleteSuccess:false,
  deleteNoteError:null,
};

export const notesLists= createAsyncThunk(
    'GET/API/NOTES',
  async (noData,{getState,rejectWithValue})=>{
  try{
    const {userInfo}=getState().userLogin;
        const config={
          headers:{
              Authorization:`Bearer ${userInfo.token}`
          },
      };
        const {data}=await axios.get(`http://192.168.1.119:5001/api/notes`,config)
        return data;
    }catch(err){
      const message=err.response && err.response.data.message ? err.response.data.message  :  err.message;
      return rejectWithValue(message);
    }  
})

export const notesCreate=createAsyncThunk(
  'POST/api/notes',
  async(payload,{dispatch,getState,rejectWithValue})=>{
      try{
          const {title,content,category}=payload;
          const {userInfo}=getState().userLogin;
          const config={
            headers:{
                'Authorization':`Bearer ${userInfo.token}`,
                'Content-Type' : 'application/json; charset=UTF-8',
            },
        };
          const {data}=await axios.post(`http://192.168.1.119:5001/api/notes/create`,{
            title:title,content:content,category:category},config);
          return data;
      }catch(err){
        const message=err.response && err.response.data.message ? err.response.data.message  :  err.message;
        return rejectWithValue(message);
      }
  }
)

export const updateNotes=createAsyncThunk(
  'PUT/API/NOTES/:ID',
  async (payload,{dispatch,getState,rejectWithValue})=>{
    try{
        const {id,title,content,category}=payload;
        const {userInfo}=getState().userLogin;
        const config={
          headers:{
              'Authorization':`Bearer ${userInfo.token}`,
              'Content-Type' : 'application/json; charset=UTF-8',
          },          
      };
      const {data}=await axios.put(`http://192.168.1.119:5001/api/notes/${id}`,{
            title:title,content:content,category:category},config);
          return data;
    }catch(err){
      const message=err.response && err.response.data.message ? err.response.data.message  :  err.message;
        return rejectWithValue(message);
    }
  }
)

export const deleteNotes=createAsyncThunk(
  'DELETE/API/NOTES/:ID',
  async (payload,{dispatch,getState,rejectWithValue})=>{
    try{
      const {id}=payload;
      const {userInfo}=getState().userLogin;
      const config={
        headers:{
            'Authorization':`Bearer ${userInfo.token}`,
            
        },          
    };
    const {data}=await axios.delete(`http://192.168.1.119:5001/api/notes/${id}`,
          config);
        return data;
    }catch(err){
      const message=err.response && err.response.data.message ? err.response.data.message  :  err.message;
        return rejectWithValue(message);
    }
  }
)

export const noteListSlice = createSlice({
    name: 'noteList',
    initialState,
    reducers: {
      statusDone:(state,action)=>{
        state.status=action.payload;
      },  
      resetError:(state,action)=>{
        state.error=null;
        state.updateNoteError=null;
        state.createNoteError=null;
        state.deleteNoteError=null;
        state.notes=[];
      },
    },
    extraReducers:{
          [notesLists.pending]:(state,action)=>{
            state.loading=true;
          },
          [notesLists.fulfilled]:(state,action)=>{
            state.loading=false;
            state.notes=action.payload;
            state.error=null;
          },
          [notesLists.rejected]:(state,action)=>{
            state.loading=false;

            state.error=action.payload;
          },
          [notesCreate.pending]:(state,action)=>{
            state.loading=true;
          },
          [notesCreate.fulfilled]:(state,action)=>{
            state.loading=false;
            state.success=true
          },
          [notesCreate.rejected]:(state,action)=>{
            state.loading=false;
            state.createNoteError=action.payload;
          },
          [updateNotes.pending]:(state,action)=>{
            state.updateLoading=true;
          },
          [updateNotes.fulfilled]:(state,action)=>{
            state.updateLoading=false;
            state.updateSuccess=true
          },
          [updateNotes.rejected]:(state,action)=>{
            state.updateLoading=false;
            state.updateNoteError=action.payload;
            state.updateSuccess=false;
          },
          [deleteNotes.pending]:(state,action)=>{
            state.deleteLoading=true;
            state.deleteSuccess=false;
          },
          [deleteNotes.fulfilled]:(state,action)=>{
            state.deleteLoading=false;
            state.deleteSuccess=true
          },
          [deleteNotes.rejected]:(state,action)=>{
            state.deleteLoading=false;
            state.deleteNoteError=action.payload;
            state.deleteSuccess=false;
          },
    } 
  });
  
  export const { statusDone,resetError} = noteListSlice.actions;
  
  export const selectNotes = (state) => state.noteList;
  
  export default noteListSlice.reducer;