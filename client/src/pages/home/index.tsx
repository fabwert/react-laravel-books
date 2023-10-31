import { useEffect } from "react";
import BookCard from "../../components/BookCard";
import { useAppDispatch } from "../../store";
import {
  fetchBooks,
  getBookStatus,
  getFilteredBooks,
} from "../../features/book/book.slice";
import { useSelector } from "react-redux";
import SkeletonCard from "../../components/SkeletonCard";
import { Spacer } from "@nextui-org/react";
import SimpleCard from "../../components/SimpleCard";
import BookModal from "../../components/BookModal";

function HomePage() {
  const dispatch = useAppDispatch();
  const books = useSelector(getFilteredBooks);
  const status = useSelector(getBookStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  return (
    <>
      {status === "succeeded" && books.length === 0 && (
        <div className="d-flex align-items-center justify-content-center">
          <SimpleCard message="No books found." />
        </div>
      )}
      {status === "failed" && <SimpleCard message="Something went wrong." />}
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {status === "loading"
          ? Array(8)
              .fill(null)
              .map((_, i) => (
                <div key={`skeleton-${i}`}>
                  <SkeletonCard /> <Spacer x={4} />
                </div>
              ))
          : books.map((book) => (
              <div key={`book-${book.id}`}>
                <BookCard book={book} /> <Spacer x={4} />{" "}
              </div>
            ))}
      </div>
      <BookModal />
    </>
  );
}

export default HomePage;
