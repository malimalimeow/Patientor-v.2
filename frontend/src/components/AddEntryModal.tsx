import { Dialog, DialogTitle, DialogContent, Divider } from "@mui/material";

import NewEntry from "./NewEntry";
import { EntryFormValues } from "../types";
import type { Diagnosis, message } from "../types";
import Notification from "./notification";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
  patientId: string;
  setMessage: React.Dispatch<React.SetStateAction<message>>;
  message: message;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  diagnoses,
  patientId,
  setMessage,
  message,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add New Entry</DialogTitle>
    <Divider />
    <DialogContent>
      <Notification message={message} setMessage={setMessage} />
      <NewEntry
        onSubmit={onSubmit}
        onCancel={onClose}
        diagnoses={diagnoses}
        patientId={patientId}
      />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
