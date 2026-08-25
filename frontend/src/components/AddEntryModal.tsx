import { Dialog, DialogTitle, DialogContent, Divider } from "@mui/material";

import NewEntry from "./NewEntry";
import { EntryFormValues } from "../types";
import Notification from "./notification";
import { useModalActions, useModalOpen } from "../stores/modalStore";

interface Props {
  onSubmit: (id: string, values: EntryFormValues) => void;
  patientId: string;
}

const AddEntryModal = ({ onSubmit, patientId }: Props) => {
  const modalOpen = useModalOpen();
  const { closeModal } = useModalActions();
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => closeModal()}>
      <DialogTitle>Add New Entry</DialogTitle>
      <Divider />
      <DialogContent>
        <Notification />
        <NewEntry onSubmit={onSubmit} patientId={patientId} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
