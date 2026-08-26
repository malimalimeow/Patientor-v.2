import type { Entry, EntryFormValues } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import "../patientDetail.css";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import EmergencyIcon from "@mui/icons-material/Emergency";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { assertNever } from "../helper";
import { Button } from "@mui/material";
import AddEntryModal from "./AddEntryModal";
import axios from "axios";
import { useNotiAction } from "../stores/notificationStore";
import { usePatientActions, useShowPatient } from "../stores/patientStore";
import { useModalActions } from "../stores/modalStore";

export const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      const color =
        entry.healthCheckRating === 0
          ? "#2E7D32"
          : entry.healthCheckRating === 1
            ? "#ED6C02"
            : entry.healthCheckRating === 2
              ? "#D32F2F"
              : "#C62828";
      return (
        <div className="entryContainer">
          <p>
            {entry.date}
            <MedicalInformationIcon />
          </p>
          <p>{entry.description}</p>
          <FavoriteIcon sx={{ color: color }} />
          <p>Diagnosed by {entry.specialist}</p>
        </div>
      );
    case "Hospital":
      return (
        <div className="entryContainer">
          <p>
            {entry.date} <LocalHospitalIcon />
          </p>
          <p>{entry.description}</p>
          <p>discharge:</p>
          <p>{entry.discharge.date}</p>
          <p>{entry.discharge.criteria}</p>
          <p>Diagnosed by {entry.specialist}</p>
        </div>
      );

    case "OccupationalHealthcare":
      return (
        <div className="entryContainer">
          <p>
            {entry.date}
            <EmergencyIcon />
            {entry.employerName}
          </p>
          <p>{entry.description}</p>
          <p>Diagnosed by {entry.specialist}</p>
        </div>
      );

    default:
      return assertNever(entry);
  }
};

const PatientDetails = () => {
  const { setMessage } = useNotiAction();
  const showPatient = useShowPatient();
  const { createEntry } = usePatientActions();
  const { openModal, closeModal } = useModalActions();

  if (!showPatient) {
    return <p>Loading</p>;
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
      createEntry(id, values);
      closeModal();
      setMessage(`new Entry on ${date} added`, false);
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
    <div>
      <h2>
        {showPatient?.name}
        <GenderIcon color="primary" fontSize="large" />
      </h2>
      <p>occupation:{showPatient?.occupation}</p>
      <p>date of birth:{showPatient?.dateOfBirth}</p>

      {showPatient && <h3>Entries</h3>}
      {showPatient?.entries?.map((entry) => (
        <div key={entry.id}>
          <EntryDetails entry={entry} />
        </div>
      ))}

      <AddEntryModal onSubmit={submitNewEntry} patientId={showPatient.id} />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientDetails;
