import { configureStore } from "@reduxjs/toolkit";
// import { CartSlice } from "./Slices/CartSlice";
// import CartSlice from "./CartSlice";
// import CartSlice from "./Slices/CartSlice";
import formSlice from './slices/formSlice'
import playerSlice from "./slices/playerSlice";



const preloadedState = loadStateFromLocalStorage();

export const store = configureStore({
    reducer:{
        form: formSlice,
        player:playerSlice,
    },

    preloadedState
});

store.subscribe(() => {
    saveStateToLocalStorage(store.getState());
  });
  
  function saveStateToLocalStorage(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('reduxState', serializedState);
    } catch (error) {
      console.error('Error saving state to local storage:', error);
    }
  }
  
  function loadStateFromLocalStorage() {
    try {
      const serializedState = localStorage.getItem('reduxState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (error) {
      console.error('Error loading state from local storage:', error);
      return undefined;
    }
  }

export default store;