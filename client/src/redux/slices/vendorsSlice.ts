import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vendor } from "../../types";

interface VendorsState {
  list: Vendor[];
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: VendorsState = {
  list: [],
  status: "idle",
};

const vendorsSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    fetchVendorsRequest(state) {
      state.status = "loading";
    },
    fetchVendorsSuccess(state, action: PayloadAction<Vendor[]>) {
      state.status = "succeeded";
      state.list = action.payload;
    },
    fetchVendorsFailure(state) {
      state.status = "failed";
    },
  },
});

export const { fetchVendorsRequest, fetchVendorsSuccess, fetchVendorsFailure } =
  vendorsSlice.actions;
export default vendorsSlice.reducer;
