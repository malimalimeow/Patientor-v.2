import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import axios from "axios";

import { PatientFormValues, Patient, message } from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";

interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  getOnePatient: (id: string) => Promise<void>;
  setMessage: React.Dispatch<React.SetStateAction<message>>;
  message: message;
}

const PatientListPage = ({
  patients,
  setPatients,
  getOnePatient,
  setMessage,
  message,
}: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setMessage({
      message: "",
      isError: true,
    });
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      console.log(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
      setMessage({ message: `${patient.name} added`, isError: false });
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

  const findPatientData = async (id: string) => {
    await getOnePatient(id);
  };

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table sx={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Link
                  to={`/patients/${patient.id}`}
                  onClick={() => findPatientData(patient.id)}
                >
                  {patient.name}
                </Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        setMessage={setMessage}
        message={message}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
