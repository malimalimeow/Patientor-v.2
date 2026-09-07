import { Dialog, DialogTitle, DialogContent, Divider } from "@mui/material";
import Notification from "../notification";
import UpdatePWForm from "./UpdatePWForm";
import { useModalOpen, useModalActions } from "../../stores/modalStore";

const UpdatePasswordModal = () => {
  const modalOpen = useModalOpen();
  const { closeModal } = useModalActions();

  return (
    <Dialog
      fullWidth={true}
      open={modalOpen === "updatePW"}
      onClose={() => closeModal()}
    >
      <DialogTitle>Update Password</DialogTitle>
      <Divider />
      <DialogContent>
        <Notification />
        <UpdatePWForm />
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePasswordModal;
