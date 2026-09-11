import { Dialog, DialogTitle, DialogContent, Divider } from "@mui/material";
import Notification from "../notification";
import UpdatePatientForm from "./UpdatePatientForm";
import { useModalOpen, useModalActions } from "../../stores/modalStore";

const UpdatePatientModal = () => {
  const modalOpen = useModalOpen();
  const { closeModal } = useModalActions();

  return (
    <Dialog
      fullWidth={true}
      open={modalOpen === "updatePW"}
      onClose={() => closeModal()}
    >
      <DialogTitle>Update Patient Details</DialogTitle>
      <Divider />
      <DialogContent>
        <Notification />
        <UpdatePatientForm />
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePatientModal;
