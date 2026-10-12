import type { EntryFormValues } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import "../patientDetail.css";
import { Button } from "@mui/material";
import AddEntryModal from "./AddEntryModal/AddEntryModal";
import axios from "axios";
import { useNotiAction } from "../stores/notificationStore";
import { usePatientActions, useShowPatient } from "../stores/patientStore";
import { useModalActions } from "../stores/modalStore";
import { useModalOpen } from "../stores/modalStore";
import UpdatePatientModal from "./UpdatePatientModal";
import { useLoginEmployee } from "../stores/loginStore";
import { useNavigate, useParams } from "react-router-dom";
import { EntryDetails } from "./entryDetails";
import { useEffect } from "react";

const PatientDetails = () => {
  const navigate = useNavigate();
  const toPatientList = () => navigate("/patients");
  const loginEmployee = useLoginEmployee();
  const loginEmployeeRole = loginEmployee?.role;
  const { setMessage } = useNotiAction();
  const showPatient = useShowPatient();
  console.log(showPatient);
  const { createEntry, deletePatient, getOnePatient } = usePatientActions();
  const { openModal, closeModal } = useModalActions();
  const modalOpen = useModalOpen();
  const { selectedEntry } = usePatientActions();
  const { id } = useParams();
  console.log(id);

  if (!id) {
    return <p>Patient not Found</p>;
  }

  useEffect(() => {
    if (!loginEmployee) {
      return;
    }

    const getOne = async () => {
      await getOnePatient(id);
    };

    void getOne();
  }, [loginEmployee]);

  if (!showPatient) {
    return <p>Looking for Patient details</p>;
  }

  const GenderIcon =
    showPatient?.gender === "female"
      ? FemaleIcon
      : showPatient?.gender === "male"
        ? MaleIcon
        : TransgenderIcon;

  const submitNewEntry = async (id: string, values: EntryFormValues) => {
    try {
      const date = values.date;
      await createEntry(id, values);
      closeModal();
      setMessage(`new Entry on ${date} added`, false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "object") {
          const firstError = e?.response?.data.details[0];
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

  const deleteThisPatient = async () => {
    if (!window.confirm(`Remove patient:${showPatient.name}?`)) {
      return;
    }
    const id = showPatient.id;
    try {
      await deletePatient(id);
      toPatientList();
      setMessage("Patient deleted", false);
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

  const handleAddEntryModal = () => {
    selectedEntry(null);
    openModal("addEntry");
  };

  return (
    <div>
      <h2>
        {showPatient?.name}
        <GenderIcon color="primary" fontSize="large" />
      </h2>
      <p>occupation:{showPatient?.occupation}</p>
      <p>date of birth:{showPatient?.dateOfBirth}</p>

      {modalOpen === "updatePatient" && <UpdatePatientModal />}
      <Button variant="contained" onClick={() => openModal("updatePatient")}>
        Update Patient details
      </Button>

      {modalOpen === "addEntry" && (
        <AddEntryModal onSubmit={submitNewEntry} patientId={showPatient.id} />
      )}
      <Button variant="contained" onClick={() => handleAddEntryModal()}>
        Add New Entry
      </Button>

      {showPatient && <h3>Records</h3>}

      {showPatient?.entries?.map((entry) => (
        <div key={entry.id || entry._id}>
          <EntryDetails entry={entry} />
        </div>
      ))}

      {loginEmployeeRole === "master" && (
        <Button onClick={() => deleteThisPatient()}>Delete Record</Button>
      )}
    </div>
  );
};

export default PatientDetails;
