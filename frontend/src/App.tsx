import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import PatientListPage from "./components/PatientListPage";
import PatientDetails from "./components/PatientDetails";
import Notification from "./components/notification";
import { useDiagnosesAction } from "./stores/diagnosesStore";
import { usePatientActions } from "./stores/patientStore";
import Login from "./components/Login";
import Employee from "./components/Employee";
import EmployeeDetails from "./components/EmployeeDetails";

const App = () => {
  const { fetchPatientList } = usePatientActions();
  const { fetchDiagnoses } = useDiagnosesAction();

  useEffect(() => {
    const ping = async () => {
      await axios.get<string>(`${apiBaseUrl}/ping`);
      console.log("Backend ready！");
    };

    fetchPatientList();
    fetchDiagnoses();

    void ping();
  }, [fetchPatientList, fetchDiagnoses]);

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
          <Notification />
          <Routes>
            <Route path="/employee" element={<Employee />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="/" element={<Login />} />
            <Route path="/patients" element={<PatientListPage />} />
            <Route path="/patients/:id" element={<PatientDetails />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
