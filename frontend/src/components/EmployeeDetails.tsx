import { useEmployeeActions, useShowEmployee } from "../stores/employeeStore";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { useLoginEmployee } from "../stores/loginStore";
import { Button, Grid } from "@mui/material";
import { useNotiAction } from "../stores/notificationStore";
import Notification from "./notification";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useModalActions, useModalOpen } from "../stores/modalStore";
import UpdatePasswordModal from "./updatePWModal";
import UpdateDetailsModal from "./updateDetailsModal";
import { useEffect } from "react";

const EmployeeDetails = () => {
  const { id } = useParams();
  const { getOneEmployee } = useEmployeeActions();
  const employee = useLoginEmployee();
  const { setMessage } = useNotiAction();
  const navigate = useNavigate();
  const toEmployeeList = () => navigate("/employee");
  const showEmployee = useShowEmployee();
  const { deleteEmployee } = useEmployeeActions();
  const { openModal } = useModalActions();
  const modalOpen = useModalOpen();

  console.log(id);
  console.log(employee);

  if (!id) {
    return <p>Employee Not Found</p>;
  }

  useEffect(() => {
    if (!employee) {
      return;
    }
    const getEmployee = async () => {
      await getOneEmployee(id);
    };

    void getEmployee();
  }, [id]);

  if (!showEmployee || !employee) {
    return <p>Loading</p>;
  }

  const employeeSelf = employee?.id === showEmployee?.id;
  console.log(employee?.id, showEmployee?.id, employee?.role);

  const master = employee?.role === "master";
  const admin = employee?.role === "admin";

  const showData = master || admin || employeeSelf;

  console.log(showData);

  const GenderIcon =
    showEmployee?.gender === "female"
      ? FemaleIcon
      : showEmployee?.gender === "male"
        ? MaleIcon
        : TransgenderIcon;

  const handleDelete = async () => {
    try {
      if (!window.confirm(`Remove employee:${showEmployee?.name}?`)) {
        return;
      }
      const id = showEmployee?.id;
      await deleteEmployee(id as string);
      toEmployeeList();
      setMessage("Employee Removed", false);
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
    <>
      <Notification />
      {showData && (
        <div>
          <h2>
            {showEmployee?.name}
            <GenderIcon fontSize="large" />
          </h2>
          <p>Title:{showEmployee?.title}</p>
          <p>Date of birth:{showEmployee?.dateOfBirth}</p>
          <p>Address:{showEmployee?.address}</p>
          <p>NI:{showEmployee?.NI}</p>
          <p>Emergency Contact:{showEmployee?.emergencyContact}</p>
          {master || admin ? (
            <>
              <Grid
                container
                justifyContent="space-between"
                sx={{ marginTop: 2 }}
              >
                <Grid size="auto">
                  <Button
                    variant="contained"
                    onClick={() => openModal("updateDetails")}
                  >
                    Update Employee Details
                  </Button>
                  {modalOpen === "updateDetails" && <UpdateDetailsModal />}
                </Grid>
                <Grid size="auto"></Grid>
                <Button variant="contained" onClick={() => handleDelete()}>
                  Delete Employee record
                </Button>
              </Grid>
            </>
          ) : null}
          {employeeSelf || master ? (
            <Grid size="auto">
              <Button variant="contained" onClick={() => openModal("updatePW")}>
                update Password
              </Button>
            </Grid>
          ) : null}
          {modalOpen === "updatePW" && <UpdatePasswordModal />}
        </div>
      )}
    </>
  );
};

export default EmployeeDetails;
