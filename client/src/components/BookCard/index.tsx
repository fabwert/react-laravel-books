import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
} from "@nextui-org/react";
import { FC } from "react";
import { Book } from "../../features/book/book.interface";

interface BookCardProps {
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col text-left">
          <p className="text-md">{book?.title}</p>
          <p className="text-small text-default-500">Fabwert</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{book?.description}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link isExternal showAnchorIcon href="https://github.com/fabwert">
          Visit me on Github.
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
