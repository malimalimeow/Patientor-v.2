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
import { NewEmployeeForm, EmployeeType } from "../types";
import { useNotiAction } from "../stores/notificationStore";
import { useEmployee, useEmployeeActions } from "../stores/employeeStore";
import { useModalActions, useModalOpen } from "../stores/modalStore";
import AddEmployeeModal from "./AddEmployeeModal";

const EmployeeListPage = () => {
  const { setMessage } = useNotiAction();
  const employee = useEmployee();
  const { createEmployee, getOneEmployee } = useEmployeeActions();
  const modalOpen = useModalOpen();
  const { openModal, closeModal } = useModalActions();

  const submitNewEmployee = async (values: NewEmployeeForm) => {
    try {
      const name = values.name;
      createEmployee(values);
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

  const findEmployeeData = async (id: string) => {
    await getOneEmployee(id);
  };

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Employee list
        </Typography>
      </Box>
      <Table sx={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(employee).map((employee: EmployeeType) => (
            <TableRow key={employee.id}>
              <TableCell>
                <Link
                  to={`/employee/${employee.id}`}
                  onClick={() => findEmployeeData(employee.id)}
                >
                  {employee.name}
                </Link>
              </TableCell>
              <TableCell>{employee.gender}</TableCell>
              <TableCell>{employee.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {modalOpen === "addNewEmployee" && (
        <AddEmployeeModal onSubmit={submitNewEmployee} />
      )}
      <Button variant="contained" onClick={() => openModal("addNewEmployee")}>
        Add New Employee
      </Button>
    </div>
  );
};

export default EmployeeListPage;
