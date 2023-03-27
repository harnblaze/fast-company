import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../hooks/useUsers";
import { AppDispatch, RootState } from "./createStore";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import { ISignUpData } from "../hooks/useAuth";
import localStorageService from "../services/localStorage.service";

interface IUsersSliceState {
  entities: IUser[];
  isLoading: boolean;
  error: any | null;
  auth: null | string;
  isLoggedIn: boolean;
}

const initialState: IUsersSliceState = {
  entities: [],
  isLoading: true,
  error: null,
  auth: null,
  isLoggedIn: false,
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
    authRequestSuccess: (state, action) => {
      state.auth = { ...action.payload };
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = { ...action.payload };
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersRequestFailed,
  usersReceived,
  authRequestSuccess,
  authRequestFailed,
} = actions;
const authRequested = createAction("users/authRequested");
export const singUp =
  ({ email, password, ...rest }: ISignUpData) =>
  async (dispatch: AppDispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password, ...rest });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
    } catch (e: any) {
      dispatch(authRequestFailed(e.message));
    }
  };

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
