import { Dialog, DialogTitle, DialogContent, Divider } from "@mui/material";

import 
import { PatientFormValues } from "../../types";
import Notification from "../notification";
import { useModalOpen, useModalActions } from "../../stores/modalStore";

interface Props {
  onSubmit: (values: PatientFormValues) => Promise<void>;
}

const AddPatientModal = ({ onSubmit }: Props) => {
  const modalOpen = useModalOpen();
  const { closeModal } = useModalActions();

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => closeModal()}>
      <DialogTitle>Add a new patient</DialogTitle>
      <Divider />
      <DialogContent>
        <Notification />
        <AddPatientForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientModal;
