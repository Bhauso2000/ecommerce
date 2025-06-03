import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  page: number;
  limit: number;
  search: string;
  order:'asc' | 'desc'
}

const initialState: PaginationState = {
  page: 1,
  limit: 10,
  search: '',
  order:'asc'
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    updatePagination: (state, action: PayloadAction<Partial<PaginationState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updatePagination } = paginationSlice.actions;

export default paginationSlice.reducer;
