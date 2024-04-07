import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
export interface BenefitiaryState {
  value: Record<any, any>[];
}

// Define the initial state using that type
const initialState: BenefitiaryState = {
  value: [],
};

export const benefitiarySlice = createSlice({
  name: "benefitiary",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Record<any, any>>) => {
      state.value.push(action.payload);
    },
    remove: (state, action: PayloadAction<Record<any, any>>) => {
      state.value = state.value.filter((val) => val.id !== action.payload.id);
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    edit: (state, action: PayloadAction<Record<any, any>>) => {
      console.log("edit state -- ", state.value);
      state.value = state.value.map((val) => {
        if (val.id === action.payload.id) {
          return action.payload;
        }
        return val;
      });
    },
  },
});

export const { add, remove, edit } = benefitiarySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const benefitiaryList = (state: RootState) => state.benefitiary.value;

export default benefitiarySlice.reducer;
