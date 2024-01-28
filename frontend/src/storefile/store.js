import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slicefile/authSlice'

const loadState = () => {
    try {
      const reduxData = localStorage.getItem('reduxState');
      if (reduxData === null) {
        return undefined;
      }
      return JSON.parse(reduxData);
    } catch (err) {
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      const reduxData = JSON.stringify(state);
      localStorage.setItem('reduxState', reduxData);
    } catch (err) {
      console.log("Error saving state to localStorage", err);
    }
  };
  
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: loadState(),
  });
  store.subscribe(() => {
    saveState(store.getState());
  });
  
  export {store}