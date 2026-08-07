import { Dialog, DialogTitle, DialogContent, Divider } from "@mui/material";

import AddPatientForm from "./AddPatientForm";
import { message, PatientFormValues } from "../../types";
import Notification from "../notification";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => Promise<void>;
  message: message;
  setMessage: React.Dispatch<React.SetStateAction<message>>;
}

const AddPatientModal = ({
  modalOpen,
  onClose,
  onSubmit,
  message,
  setMessage,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      <Notification message={message} setMessage={setMessage} />
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddPatientModal;
