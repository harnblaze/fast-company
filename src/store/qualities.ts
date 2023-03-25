import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";
import { AppDispatch, RootState } from "./createStore";
import { IQuality } from "../api/fake.api/qualities";
import { isOutDated } from "../utils/isOutDated";

interface IQualitiesSliceState {
  entities: IQuality[];
  isLoading: boolean;
  error: any | null;
  lastFetch: number;
}
const initialState: IQualitiesSliceState = {
  entities: [],
  isLoading: true,
  error: null,
  lastFetch: 0,
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
      state.lastFetch = Date.now();
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

export const loadQualitiesList =
  () => async (dispatch: AppDispatch, getState?: () => RootState) => {
    if (getState !== undefined) {
      const { lastFetch } = getState().qualities;
      if (isOutDated(lastFetch)) {
        dispatch(qualitiesRequested());
      }
    }

    try {
      const { content } = await qualityService.get();
      dispatch(qualitiesReceived(content));
    } catch (e: any) {
      dispatch(qualitiesRequestFailed(e.message));
    }
  };

export const getQualities = () => (state: RootState) =>
  state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state: RootState) =>
  state.qualities.isLoading;
export const getQualitiesByIds =
  (qualitiesIds: string[]) => (state: RootState) => {
    if (state.qualities.entities.length > 0) {
      const qualitiesArray = [];
      for (const qualitiesId of qualitiesIds) {
        for (const quality of state.qualities.entities) {
          if (qualitiesId === quality._id) {
            qualitiesArray.push(quality);
            break;
          }
        }
      }
      return qualitiesArray;
    }
    return [];
  };

export default qualitiesReducer;
