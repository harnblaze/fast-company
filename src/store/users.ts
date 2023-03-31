import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../hooks/useUsers";
import { AppDispatch, RootState } from "./createStore";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import {
  ICreateUserData,
  ISignInData,
  ISignUpData,
  IUpdateUserData,
} from "../hooks/useAuth";
import localStorageService from "../services/localStorage.service";
import { getRandomInt } from "../utils/randomInt";
import history from "../utils/history";
import { generateAuthError } from "../utils/generateAuthError";

interface IUsersSliceState {
  entities: IUser[];
  isLoading: boolean;
  error: any | null;
  auth: null | { userId: string };
  isLoggedIn: boolean;
  dataLoaded: boolean;
}
const initialState: IUsersSliceState =
  localStorageService.getAccessToken() !== ""
    ? {
        entities: [],
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserID() },
        isLoggedIn: true,
        dataLoaded: false,
      }
    : {
        entities: [],
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false,
      };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action: PayloadAction<IUser[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    usersRequestFailed: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequested: (state) => {
      state.error = null;
    },
    authRequestSuccess: (state, action) => {
      state.auth = { ...action.payload };
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action: PayloadAction<IUser>) => {
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = [];
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },

    userUpdateSuccess: (state, action: PayloadAction<IUser>) => {
      state.entities[
        state.entities.findIndex((user) => user._id === action.payload._id)
      ] = action.payload;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersRequestFailed,
  usersReceived,
  authRequested,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  userUpdateSuccess,
} = actions;

const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFailed = createAction("users/userCreateFailed");
const userUpdateRequested = createAction("users/userCreateRequested");
const userUpdateFailed = createAction("users/userCreateFailed");

const createUser =
  (payload: ICreateUserData) => async (dispatch: AppDispatch) => {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.create(payload);
      dispatch(userCreated(content));
      history.push("/users");
    } catch (error: any) {
      dispatch(userCreateFailed(error.message));
    }
  };

export const signIn =
  ({ payload, redirect }: { payload: ISignInData; redirect: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch(authRequested);
    try {
      const data = await authService.login(payload);
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
      history.push(redirect);
    } catch (e: any) {
      const { code, message } = e.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(e.message));
      }
    }
  };

export const singUp =
  ({ email, password, ...rest }: ISignUpData) =>
  async (dispatch: AppDispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password, ...rest });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
      void dispatch(
        createUser({
          email,
          _id: data.localId,
          rate: getRandomInt(1, 10),
          completedMeetings: getRandomInt(0, 200),
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest,
        })
      );
    } catch (e: any) {
      dispatch(authRequestFailed(e.message));
    }
  };

export const logOut = () => (dispatch: AppDispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push("/");
};

export const updateUser =
  (payload: IUpdateUserData) => async (dispatch: AppDispatch) => {
    userUpdateRequested();
    try {
      const { content } = await userService.update(payload);
      await dispatch(userUpdateSuccess(content));
      history.push(`/users/${payload._id}`);
    } catch (e: any) {
      dispatch(userUpdateFailed(e));
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
export const getIsLoggedIn = () => (state: RootState) => state.users.isLoggedIn;
export const getDataLoaded = () => (state: RootState) => state.users.dataLoaded;
export const getCurrentUserData = () => (state: RootState) => {
  return state.users.entities.find((el) => el._id === state.users.auth?.userId);
};
export const getCurrentUserId = () => (state: RootState) =>
  state.users.auth?.userId;
export const getAuthErrors = () => (state: RootState) => state.users.error;

export default usersReducer;
