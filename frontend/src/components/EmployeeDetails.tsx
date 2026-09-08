import { useEmployeeActions, useShowEmployee } from "../stores/employeeStore";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { useLoginEmployee } from "../stores/loginStore";
import { Button } from "@mui/material";
import { useNotiAction } from "../stores/notificationStore";
import Notification from "./notification";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useModalActions, useModalOpen } from "../stores/modalStore";
import UpdateDetailsForm from "./updateDetailsModal";
import UpdatePasswordModal from "./updatePWModal";
import UpdateDetailsModal from "./updateDetailsModal";

const EmployeeDetails = () => {
  const employee = useLoginEmployee();
  const { setMessage } = useNotiAction();
  const navigate = useNavigate();
  const toEmployeeList = () => navigate("/employee");
  const showEmployee = useShowEmployee();
  const { deleteEmployee } = useEmployeeActions();
  const { openModal, closeModal } = useModalActions();
  const modalOpen = useModalOpen();

  if (!showEmployee) {
    return <p>Loading</p>;
  }

  const employeeSelf = employee?.name === showEmployee?.name;
  const manager = employee?.role === "master" || employee?.role === "admin";
  const showData = manager || employeeSelf;

  const GenderIcon =
    showEmployee?.gender === "female"
      ? FemaleIcon
      : showEmployee?.gender === "male"
        ? MaleIcon
        : TransgenderIcon;

  const handleDelete = async () => {
    try {
      if (!window.confirm(`Remove employee:${showEmployee.name}?`)) {
        return;
      }
      const id = showEmployee.id;
      await deleteEmployee(id);
      setMessage("Employee Removed", false);
      toEmployeeList();
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
          {manager ? (
            <>
              <Button onClick={() => openModal("updateDetails")}>
                Update Employee Details
              </Button>
              {modalOpen === "updateDetails" && <UpdateDetailsModal />}
              <Button onClick={() => handleDelete()}>
                Delete Employee record
              </Button>
            </>
          ) : null}
          {employeeSelf ? (
            <Button onClick={() => openModal("updatePW")}>
              update Password
            </Button>
          ) : null}
          {modalOpen === "updatePW" && <UpdatePasswordModal />}
        </div>
      )}
    </>
  );
};

export default EmployeeDetails;
