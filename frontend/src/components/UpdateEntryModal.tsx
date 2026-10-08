import { Dialog, DialogTitle, DialogContent, Divider } from "@mui/material";
import Notification from "./notification";
import { useModalOpen, useModalActions } from "../stores/modalStore";
import NewEntry from "./AddEntryModal/NewEntry";
import { UpdateEntryType } from "../types";
import {
  useToUpdateEntry,
  usePatientActions,
  useShowPatient,
} from "../stores/patientStore";
import { useNotiAction } from "../stores/notificationStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateEntryModal = () => {
  const modalOpen = useModalOpen();
  const { closeModal } = useModalActions();
  const { updateEntry } = usePatientActions();
  const toUpdateEntry = useToUpdateEntry();
  const { setMessage } = useNotiAction();
  const showPatient = useShowPatient();
  const navigate = useNavigate();
  const toPatient = () => navigate("/patients");

  if (!showPatient) {
    toPatient();
    setMessage("patient not exist");
    return null;
  }

  if (!toUpdateEntry) {
    return <p>loading</p>;
  }

  const updateNewEntry = async (id: string, values: UpdateEntryType) => {
    try {
      if (toUpdateEntry === null) {
        setMessage("Entry not found");
        return null;
      }
      await updateEntry(id, values, toUpdateEntry.id);
      closeModal();
      setMessage(`Entry updated`, false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "object") {
          const firstError = e?.response?.data.error[0];
          const message = `Something went wrong. Error: ${firstError?.message}`;
          setMessage(`${message}`);
        } else {
          setMessage("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setMessage("Unknown error");
      }
    }
  };

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
        <NewEntry update={updateNewEntry} patientId={showPatient.id} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEntryModal;
