import { createSlice } from "@reduxjs/toolkit";


export const formSlice = createSlice({
    name: 'form',
    initialState: {
      formData: {
        Host: '',
        Visitor: '',
        Toss: '',
        BatOrBowl: '',
        overs: ''
      },
      currentInning: 1 
    },
    reducers:{
      updateFormData: (state, action) => {
        state.formData = action.payload;
      },
      updateCurrentInning: (state, action) => {
        state.currentInning = action.payload;
      }
    }
});

export const {updateFormData,updateCurrentInning} = formSlice.actions;
export default formSlice.reducer;