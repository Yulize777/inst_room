import {createSlice} from "@reduxjs/toolkit";
 const usersSlice = createSlice({
     name: 'user',
     initialState: {
         user: {name: ''},
         err: '',
         status: ''
     },
     reducers: {

     },
     extraReducers: {
         getUser: (state, action) => {

         }
     }
 })

export const {getUser} = usersSlice.actions

export default usersSlice.reducer