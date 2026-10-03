import { Dialog, DialogTitle, DialogContent, Divider } from "@mui/material";
import Notification from "./notification";
import { useModalOpen, useModalActions } from "../stores/modalStore";

const UpdateEntryModal = () => {
  const modalOpen = useModalOpen();
  const { closeModal } = useModalActions();

  return (
    <Dialog
      fullWidth={true}
      open={modalOpen === "updateEntry"}
      onClose={() => closeModal()}
    >
      <DialogTitle> Update Entry</DialogTitle>
      <Divider />
      <DialogContent>
        <Notification />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEntryModal;
