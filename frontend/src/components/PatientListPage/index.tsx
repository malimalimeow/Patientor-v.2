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
import { PatientFormValues, Patient } from "../../types";
import AddPatientModal from "../AddPatientModal";
import HealthRatingBar from "../HealthRatingBar";
import { useNotiAction } from "../../stores/notificationStore";
import { usePatients, usePatientActions } from "../../stores/patientStore";
import { useModalActions } from "../../stores/modalStore";

const PatientListPage = () => {
  const { setMessage } = useNotiAction();
  const { getOnePatient, createPatient } = usePatientActions();
  const patients = usePatients();
  const { openModal, closeModal } = useModalActions();

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const name = values.name;
      createPatient(values);
      closeModal();
      setMessage(`${name} added`, false);
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
      <AddPatientModal onSubmit={submitNewPatient} />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
