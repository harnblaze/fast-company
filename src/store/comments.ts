import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./createStore";
import { IComment } from "../api/fake.api/comments";
import commentService from "../services/comment.service";
import { dataCommentResponse } from "../types/validatorTypes";
import { nanoid } from "nanoid";

interface ICommentsSliceState {
  entities: IComment[];
  isLoading: boolean;
  error: any | null;
}

const initialState: ICommentsSliceState = {
  entities: [],
  isLoading: true,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action: PayloadAction<IComment[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated: (state, action: PayloadAction<IComment>) => {
      state.entities.push(action.payload);
    },
    commentRemoved: (state, action: PayloadAction<string>) => {
      state.entities.filter((el) => el._id !== action.payload);
    },
  },
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequestFailed,
  commentsRequested,
  commentsReceived,
  commentCreated,
  commentRemoved,
} = actions;

const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentRemoveRequested = createAction("comments/commentRemoveRequested");

export const loadCommentsList =
  (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(commentsRequested());
    try {
      const { content } = await commentService.getComments(userId);
      dispatch(commentsReceived(content));
    } catch (e: any) {
      dispatch(commentsRequestFailed(e.message));
    }
  };

export const createComment =
  (payload: dataCommentResponse) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(commentCreateRequested());
    const comment = {
      ...payload,
      created_at: Date.now().toString(),
      userId: getState().users.auth?.userId ?? "",
      _id: nanoid(),
    };
    try {
      const { content } = await commentService.createComment(comment);
      dispatch(commentCreated(content));
    } catch (error: any) {
      dispatch(commentsRequestFailed(error.message));
    }
  };

export const removeComment =
  (commentId: string) => async (dispatch: AppDispatch) => {
    dispatch(commentRemoveRequested());
    try {
      const { content } = await commentService.removeComment(commentId);
      if (content === null) {
        dispatch(commentRemoved(commentId));
      }
    } catch (e: any) {
      dispatch(commentsRequestFailed(e.message));
    }
  };

export const getComments = () => (state: RootState) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state: RootState) =>
  state.comments.isLoading;

export default commentsReducer;
