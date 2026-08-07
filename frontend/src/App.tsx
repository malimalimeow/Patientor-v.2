import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient, message } from "./types";
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetails from "./components/PatientDetails";
import diagnosesService from "./services/diagnosesService";
import Notification from "./components/notification";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showPatient, setShowPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [message, setMessage] = useState<message>({
    message: "",
    isError: true,
  });

  useEffect(() => {
    const ping = async () => {
      await axios.get<String>(`${apiBaseUrl}/ping`);
      console.log("Backend ready！");
    };

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void ping();
    void fetchPatientList();
    void fetchDiagnoses();
  }, []);

  const getOnePatient = async (id: string) => {
    setShowPatient(null);
    const patient = await patientService.getOne(id);
    setShowPatient(patient);
  };

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider sx={{ marginY: 2 }} />
          <Notification message={message} setMessage={setMessage} />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  message={message}
                  setMessage={setMessage}
                  patients={patients}
                  setPatients={setPatients}
                  getOnePatient={getOnePatient}
                />
              }
            />

            <Route
              path="/patients/:id"
              element={
                <PatientDetails
                  message={message}
                  setMessage={setMessage}
                  setShowPatient={setShowPatient}
                  showPatient={showPatient}
                  diagnoses={diagnoses}
                />
              }
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
