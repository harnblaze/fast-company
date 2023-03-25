import { IProfession } from "../api/fake.api/professions.api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./createStore";
import { isOutDated } from "../utils/isOutDated";
import professionService from "../services/profession.service";

interface IProfessionsSliceState {
  entities: IProfession[];
  isLoading: boolean;
  error: any | null;
  lastFetch: number;
}

const initialState: IProfessionsSliceState = {
  entities: [],
  isLoading: true,
  error: null,
  lastFetch: 0,
};

const professionsSlice = createSlice({
  name: "professions",
  initialState,
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsReceived: (state, action: PayloadAction<IProfession[]>) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    professionsRequestFailed: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequestFailed, professionsRequested, professionsReceived } =
  actions;

export const loadProfessionsList =
  () => async (dispatch: AppDispatch, getState?: () => RootState) => {
    if (getState !== undefined) {
      const { lastFetch } = getState().professions;
      if (isOutDated(lastFetch)) {
        dispatch(professionsRequested());
      }
    }

    try {
      const { content } = await professionService.get();
      dispatch(professionsReceived(content));
    } catch (e: any) {
      dispatch(professionsRequestFailed(e.message));
    }
  };

export const getProfessions = () => (state: RootState) =>
  state.professions.entities;
export const getProfessionsLoadingStatus = () => (state: RootState) =>
  state.professions.isLoading;
export const getProfessionById = (id: string) => (state: RootState) => {
  if (state.professions.entities.length > 0) {
    return state.professions.entities.find((prof) => prof._id === id);
  }
};

export default professionsReducer;
