import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../hooks/useUsers";
import { AppDispatch, RootState } from "./createStore";
import userService from "../services/user.service";

interface IUsersSliceState {
  entities: IUser[];
  isLoading: boolean;
  error: any | null;
}

const initialState: IUsersSliceState = {
  entities: [],
  isLoading: true,
  error: null,
};

const usersSlice = createSlice({
  name: "professions",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action: PayloadAction<IUser[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersRequested, usersRequestFailed, usersReceived } = actions;

export const loadUsersList = () => async (dispatch: AppDispatch) => {
  dispatch(usersRequested());

  try {
    const { content } = await userService.get();
    dispatch(usersReceived(content));
  } catch (e: any) {
    dispatch(usersRequestFailed(e.message));
  }
};

export const getUsers = () => (state: RootState) => state.users.entities;
export const getUsersLoadingStatus = () => (state: RootState) =>
  state.users.isLoading;
export const getUserById = (id: string) => (state: RootState) => {
  if (state.users.entities.length > 0) {
    return state.users.entities.find((user) => user._id === id);
  }
};

export default usersReducer;
