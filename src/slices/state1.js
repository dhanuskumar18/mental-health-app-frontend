import { createSlice } from "@reduxjs/toolkit";
const state1=createSlice({   //slice is a part of a state
    name:"state1", //slice name
    initialState:{
      value:"dhanus",
            //initial state value
    },
    reducers:{ //reducer functions to update the state
        change:((state,action)=>{state.value=action.payload}),
       
    },
})
console.log(state1.actions)
export const {change} = state1.actions //action creators(Action creators for the types of actions that are handled by the slice reducer.)
export default state1.reducer;