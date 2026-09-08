import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";
import PatientListPage from "./components/PatientListPage";
import PatientDetails from "./components/PatientDetails";
import Notification from "./components/notification";
import { useDiagnosesAction } from "./stores/diagnosesStore";
import { usePatientActions } from "./stores/patientStore";
import Login from "./components/Login";
import EmployeeListPage from "./components/EmployeeListPage";
import EmployeeDetails from "./components/EmployeeDetails";
import { useEmployeeActions } from "./stores/employeeStore";
import { useLoginAction, useLoginEmployee } from "./stores/loginStore";

const App = () => {
  const { fetchPatientList } = usePatientActions();
  const { fetchDiagnoses } = useDiagnosesAction();
  const { getAllEmployee } = useEmployeeActions();
  const loginEmployee = useLoginEmployee();
  const { initialEmployee } = useLoginAction();

  useEffect(() => {
    const ping = async () => {
      await axios.get<string>("api/ping");
      console.log("Backend ready！");
    };
    void ping();
  }, []);

  useEffect(() => {
    if (!loginEmployee) {
      return;
    }
    void initialEmployee();
    void fetchPatientList();
    void fetchDiagnoses();
    void getAllEmployee();
  }, [loginEmployee]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            {loginEmployee === null ? "Login" : "Log out"}
          </Button>
          <Button
            component={Link}
            to="/patients"
            variant="contained"
            color="primary"
          >
            Patient
          </Button>
          <Button
            component={Link}
            to="/employee"
            variant="contained"
            color="primary"
          >
            Employee
          </Button>
          <Divider sx={{ marginY: 2 }} />
          <Notification />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/employee" element={<EmployeeListPage />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="/patients" element={<PatientListPage />} />
            <Route path="/patients/:id" element={<PatientDetails />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
