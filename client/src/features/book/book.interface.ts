export interface Book {
  id?: number;
  title: string;
  description: string;
}

export interface BookState {
  showBookModal: boolean;
  books: Book[];
  filteredBooks: Book[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
  save_status: "idle" | "loading" | "succeeded" | "failed";
  save_error: string | null | undefined;
}
