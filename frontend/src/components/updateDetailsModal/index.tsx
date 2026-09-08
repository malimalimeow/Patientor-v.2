import { Dialog, DialogTitle, DialogContent, Divider } from "@mui/material";
import Notification from "../notification";
import UpdateDetailsForm from "./UpdateDetailsForm";
import { useModalOpen, useModalActions } from "../../stores/modalStore";

const UpdateDetailsModal = () => {
  const modalOpen = useModalOpen();
  const { closeModal } = useModalActions();

  return (
    <Dialog
      fullWidth={true}
      open={modalOpen === "updateDetails"}
      onClose={() => closeModal()}
    >
      <DialogTitle>Update Details</DialogTitle>
      <Divider />
      <DialogContent>
        <Notification />
        <UpdateDetailsForm />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDetailsModal;
