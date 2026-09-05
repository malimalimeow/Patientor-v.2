import { useEmployeeActions } from "../../stores/employeeStore";
import { useField } from "../../hooks/useField";
import { updatePasswordForm } from "../../types";
import Notification from "../notification";
import { Button, TextField } from "@mui/material";
import { useLoginEmployee } from "../../stores/loginStore";
import { useNotiAction } from "../../stores/notificationStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SyntheticEvent } from "react";

const UpdatePWForm = () => {
  const logInEmployee = useLoginEmployee();
  const { updateEmployeePassword } = useEmployeeActions();
  const { reset: resetOld, ...oldPassword } = useField("password");
  const { reset: resetNew, ...newPassword } = useField("password");
  const { setMessage } = useNotiAction();
  const navigate = useNavigate();
  const toDetails = () => navigate("/employee/:id");
  const resetPW = () => {
    resetNew();
    resetOld();
  };

  const handleUpdatePW = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const id = logInEmployee?.id;
      if (!id) {
        setMessage("please login");
        return;
      }
      const data: updatePasswordForm = {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      };
      await updateEmployeePassword(id, data);
      setMessage(
        "Password updated,return to Employee details page in 3 seconds",
        false,
      );

      resetPW();

      setTimeout(() => {
        toDetails();
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data &&
          typeof error?.response?.data === "object"
        ) {
          const firstError = error?.response?.data.error[0];
          const message = `Something went wrong. Error:${firstError?.Message}`;
          setMessage(message);
        } else {
          setMessage("Unrecognized axios error");
        }
      } else {
        console.log("Unknown error", error);
        setMessage("Unknown error");
      }
    }
  };

  return (
    <>
      <Notification />
      <form onSubmit={handleUpdatePW}>
        <TextField label="oldPW" fullWidth {...oldPassword} />
        <TextField label="newPW" fullWidth {...newPassword} />
        <Button type="submit">Update</Button>
        <Button onClick={() => resetPW()}>Cancel</Button>
      </form>
    </>
  );
};

export default UpdatePWForm;
