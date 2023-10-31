import { Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store";
import { filterBooks } from "../../features/book/book.slice";

const SearchBook = () => {
  const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    dispatch(filterBooks(searchString));
  }, [searchString]);

  return (
    <Input
      classNames={{
        base: "max-w-full sm:max-w-[15rem] h-10",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder="Type to search..."
      size="sm"
      startContent={<SearchIcon size={18} />}
      type="search"
      value={searchString}
      onChange={(e) => setSearchString(e.target.value)}
    />
  );
};

export default SearchBook;
