import {
  Button,
  Checkbox,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { MailIcon } from "./MailIcon";
import { LockIcon } from "./LockIcon";
import { useSelector } from "react-redux";
import {
  getAuthStatus,
  getShowLoginModal,
  setShowLoginModal,
  signin,
} from "../../features/authentication/auth.slice";
import { useAppDispatch } from "../../store";
import { useState } from "react";

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const status = useSelector(getAuthStatus);
  const showLoginModal = useSelector(getShowLoginModal);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleClose = () => {
    dispatch(setShowLoginModal(false));
  };

  const handleLogin = () => {
    dispatch(signin(form));
  };

  return (
    <Modal
      isOpen={showLoginModal}
      onOpenChange={handleClose}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                value={form?.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
                value={form?.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <div className="flex py-2 px-1 justify-between">
                <Checkbox
                  classNames={{
                    label: "text-small",
                  }}
                >
                  Remember me
                </Checkbox>
                <Link color="primary" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={handleLogin}
                isLoading={status === "loading"}
              >
                Sign in
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
