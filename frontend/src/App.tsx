import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {
  Button,
  Divider,
  Container,
  Typography,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Stack,
  Paper,
  Box,
} from "@mui/material";
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
import "./app.css";

const App = () => {
  const { fetchPatientList } = usePatientActions();
  const { fetchDiagnoses } = useDiagnosesAction();
  const { getAllEmployee } = useEmployeeActions();
  const loginEmployee = useLoginEmployee();
  const { initialEmployee, logout } = useLoginAction();
  console.log(loginEmployee);

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#357385" },
      background: { default: "#e9f5fd" },
    },
    shape: { borderRadius: 12 },
    typography: { button: { textTransform: "none" } },
  });

  useEffect(() => {
    const ping = async () => {
      await axios.get<string>("api/ping");
      console.log("Backend ready！");
    };
    void ping();
  }, []);

  useEffect(() => {
    const initLogin = async () => {
      await initialEmployee();
    };

    void initLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loginEmployee) {
      console.log(loginEmployee);
      return;
    }

    void fetchPatientList();
    void fetchDiagnoses();
    void getAllEmployee();
  }, [loginEmployee, fetchPatientList, fetchDiagnoses, getAllEmployee]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <Container>
            <Paper
              elevation={0}
              sx={{
                p: 5,
                border: "1px solid #e2e8f0",
                borderRadius: 3,
                marginTop: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Stack direction="row" spacing={1.5}>
                  {loginEmployee !== null ? (
                    <Button
                      onClick={() => logout()}
                      component={Link}
                      to="/"
                      variant="outlined"
                      color="inherit"
                    >
                      Log Out
                    </Button>
                  ) : (
                    <Button
                      component={Link}
                      to="/"
                      variant="outlined"
                      color="inherit"
                    >
                      Log in
                    </Button>
                  )}
                  <Button
                    component={Link}
                    to="/patients"
                    variant="outlined"
                    color="inherit"
                  >
                    Patient
                  </Button>
                  <Button
                    component={Link}
                    to="/employee"
                    variant="outlined"
                    color="inherit"
                  >
                    Employee
                  </Button>
                </Stack>

                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: "#0f172a", marginRight: "10" }}
                >
                  Patientor
                </Typography>
              </Box>
              <Divider sx={{ mb: 4 }} />
              <Notification />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/employee" element={<EmployeeListPage />} />
                <Route path="/employee/:id" element={<EmployeeDetails />} />
                <Route path="/patients" element={<PatientListPage />} />
                <Route path="/patients/:id" element={<PatientDetails />} />
              </Routes>
            </Paper>
          </Container>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
