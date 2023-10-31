import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { getAuthUser, logout } from "../../features/authentication/auth.slice";
import { useAppDispatch } from "../../store";

const UserDropdown = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(getAuthUser);
  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: "https://avatars.githubusercontent.com/u/71391304?v=4",
          }}
          className="transition-transform"
          description="User"
          name={user?.name}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={handleLogout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
