import type {
  Patient,
  Diagnosis,
  Entry,
  EntryFormValues,
  message,
} from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import "../patientDetail.css";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import EmergencyIcon from "@mui/icons-material/Emergency";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { assertNever } from "../helper";
import { useState } from "react";
import { Button } from "@mui/material";
import AddEntryModal from "./AddEntryModal";
import patientService from "../services/patients";
import axios from "axios";

interface PatientDetailProps {
  showPatient: Patient | null;
  diagnoses: Diagnosis[];
  setShowPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  setMessage: React.Dispatch<React.SetStateAction<message>>;
  message: message;
}

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

const PatientDetails = ({
  showPatient,
  diagnoses,
  setShowPatient,
  setMessage,
  message,
}: PatientDetailProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setMessage({
      message: "",
      isError: true,
    });
  };

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
      const newEntry = await patientService.addEntry(id, values);
      setShowPatient((prev) => {
        if (!prev) {
          return null;
        }
        return {
          ...prev,
          entries: prev.entries ? prev.entries.concat(newEntry) : [newEntry],
        };
      });
      setModalOpen(false);
      setMessage({
        message: `new Entry on ${newEntry.date} added`,
        isError: false,
      });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "object") {
          const firstError = e?.response?.data.error[0];
          const message = `Something went wrong. Error: ${firstError?.message}`;
          setMessage((prev) => {
            return { ...prev, message: message };
          });
        } else {
          setMessage((prev) => {
            return { ...prev, message: "Unrecognized axios error" };
          });
        }
      } else {
        console.error("Unknown error", e);
        setMessage((prev) => {
          return { ...prev, message: "Unknown error" };
        });
      }
    }
  };

  return (
    <div>
      <h2>
        {showPatient?.name}
        <GenderIcon color="primary" fontSize="large" />
      </h2>
      <p>ssn:{showPatient?.ssn}</p>
      <p>occupation:{showPatient?.occupation}</p>
      <p>date of birth:{showPatient?.dateOfBirth}</p>

      {showPatient && <h3>Entries</h3>}
      {showPatient?.entries?.map((entry) => (
        <div key={entry.id}>
          <EntryDetails entry={entry} />
        </div>
      ))}

      <AddEntryModal
        setMessage={setMessage}
        message={message}
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
        diagnoses={diagnoses}
        patientId={showPatient.id}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientDetails;
