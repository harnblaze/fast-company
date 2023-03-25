import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";
import { AppDispatch } from "./createStore";
import { IQuality } from "../api/fake.api/qualities";

interface IQualitiesSliceState {
  entities: IQuality[] | null;
  isLoading: boolean;
  error: any | null;
}
const initialState: IQualitiesSliceState = {
  entities: null,
  isLoading: true,
  error: null,
};

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState,
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true;
    },
    qualitiesReceived: (state, action: PayloadAction<IQuality[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    qualitiesRequestFailed: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesRequestFailed, qualitiesReceived } =
  actions;

export const loadQualitiesList = () => async (dispatch: AppDispatch) => {
  dispatch(qualitiesRequested());
  try {
    const { content } = await qualityService.get();
    dispatch(qualitiesReceived(content));
  } catch (e: any) {
    dispatch(qualitiesRequestFailed(e.message));
  }
};

export default qualitiesReducer;
