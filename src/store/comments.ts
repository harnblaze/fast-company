import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./createStore";
import { IComment } from "../api/fake.api/comments";
import commentService from "../services/comment.service";

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
  },
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequestFailed, commentsRequested, commentsReceived } = actions;

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

export const getComments = () => (state: RootState) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state: RootState) =>
  state.comments.isLoading;

export default commentsReducer;
