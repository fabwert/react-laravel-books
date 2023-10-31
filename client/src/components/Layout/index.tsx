import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import UserDropdown from "./UserDropdown.js";
import { useSelector } from "react-redux";
import {
  getAuthUser,
  setShowLoginModal,
} from "../../features/authentication/auth.slice.js";
import { useAppDispatch } from "../../store.js";
import SearchBook from "../SearchBook/index.js";
import { setShowBookModal } from "../../features/book/book.slice.js";

export default function Layout() {
  const dispatch = useAppDispatch();
  const user = useSelector(getAuthUser);

  const handleLogin = () => {
    dispatch(setShowLoginModal(true));
  };

  const handleRegister = () => {
    dispatch(setShowBookModal(true));
  };

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <AcmeLogo />
          <p className="hidden sm:block font-bold text-inherit">BookStore</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-10">
          <NavbarItem>
            <Link href="/" aria-current="page" color="secondary">
              List
            </Link>
          </NavbarItem>
          {user && (
            <NavbarItem>
              <Link color="foreground" className="cursor-pointer" onClick={handleRegister}>
                New
              </Link>
            </NavbarItem>
          )}
        </NavbarContent>
      </NavbarContent>
      <NavbarContent className="items-center" justify="end">
        <SearchBook />
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        {user ? (
          <UserDropdown />
        ) : (
          <Button
            as={Link}
            color="primary"
            variant="flat"
            onClick={handleLogin}
          >
            Log in
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  );
}
