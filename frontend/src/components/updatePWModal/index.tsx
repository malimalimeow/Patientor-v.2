import { Dialog, DialogTitle, DialogContent, Divider } from "@mui/material";
import Notification from "../notification";
import { useModalOpen, useModalActions } from "../../stores/modalStore";

const UpdatePasswordModal = () => {
  const modalOpen = useModalOpen();
  const { closeModal } = useModalActions();

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => closeModal()}>
      <DialogTitle>Update Password</DialogTitle>
      <Divider />
      <DialogContent>
        <Notification />
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePasswordModal;
