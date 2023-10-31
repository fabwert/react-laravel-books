import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Book, BookState } from "./book.interface";
import axios from "axios";
import axiosInstance from "../../axios";

const initialState: BookState = {
  books: [],
  filteredBooks: [],
  showBookModal: false,
  status: "idle",
  error: null,
  save_status: "idle",
  save_error: null,
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios({
    method: "get",
    url: "/v1/books/",
    baseURL: import.meta.env.VITE_LARAVEL_BACKEND_URL,
  });
  return response.data;
});

export const saveBook = createAsyncThunk(
  "books/saveBook",
  async (data: Book) => {
    const response = await axiosInstance.post("/v1/books/", data);
    return response.data;
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    filterBooks: (state, action) => {
      state.filteredBooks = state.books.filter((book) =>
        book.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setShowBookModal: (state, action) => {
      state.showBookModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload.data;
        state.filteredBooks = action.payload.data;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(saveBook.pending, (state) => {
        state.save_status = "loading";
      })
      .addCase(saveBook.fulfilled, (state) => {
        state.showBookModal = false;
        state.save_status = "succeeded";
        state.status = "idle";
      })
      .addCase(saveBook.rejected, (state, action) => {
        state.save_status = "failed";
        state.save_error = action.error.message;
      });
  },
});

export const getBooks = (state: RootState) => state.book.books;
export const getFilteredBooks = (state: RootState) => state.book.filteredBooks;
export const getShowBookModal = (state: RootState) => state.book.showBookModal;
export const getBookSaveStatus = (state: RootState) => state.book.save_status;
export const getBookStatus = (state: RootState) => state.book.status;
export const getBookError = (state: RootState) => state.book.error;

export const { filterBooks, setShowBookModal } = bookSlice.actions;

export default bookSlice.reducer;
