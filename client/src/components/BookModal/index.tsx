import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { useState } from "react";
import {
  getBookSaveStatus,
  getShowBookModal,
  saveBook,
  setShowBookModal,
} from "../../features/book/book.slice";

const BookModal = () => {
  const dispatch = useAppDispatch();
  const status = useSelector(getBookSaveStatus);
  const showBookModal = useSelector(getShowBookModal);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleClose = () => {
    dispatch(setShowBookModal(false));
  };

  const handleStore = () => {
    dispatch(saveBook(form));
  };

  return (
    <Modal
      isOpen={showBookModal}
      onOpenChange={handleClose}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Store Book
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Title"
                placeholder="Enter your title"
                variant="bordered"
                value={form?.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <Textarea
                label="Description"
                placeholder="Enter your description"
                variant="bordered"
                value={form?.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={handleStore}
                isLoading={status === "loading"}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BookModal;
