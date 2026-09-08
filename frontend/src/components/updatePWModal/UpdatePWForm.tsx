import { useEmployeeActions } from "../../stores/employeeStore";
import { useField } from "../../hooks/useField";
import { updatePasswordForm } from "../../types";
import Notification from "../notification";
import { Button, TextField, Grid } from "@mui/material";
import { useLoginEmployee } from "../../stores/loginStore";
import { useNotiAction } from "../../stores/notificationStore";
import axios from "axios";
import { SyntheticEvent } from "react";
import { useModalActions } from "../../stores/modalStore";

const UpdatePWForm = () => {
  const logInEmployee = useLoginEmployee();
  const { updateEmployeePassword } = useEmployeeActions();
  const { reset: resetOld, ...oldPassword } = useField("password");
  const { reset: resetNew, ...newPassword } = useField("password");
  const { setMessage } = useNotiAction();
  const resetPW = () => {
    resetNew();
    resetOld();
  };

  const { closeModal } = useModalActions();
  const toCloseModal = () => {
    closeModal();
    resetPW();
  };

  const handleUpdatePW = async (event: SyntheticEvent) => {
    event.preventDefault();
    const id = logInEmployee?.id;
    if (!id) {
      setMessage("please login");
      return;
    }
    try {
      const data: updatePasswordForm = {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      };
      await updateEmployeePassword(id, data);
      setMessage("Password updated", false);

      resetPW();

      setTimeout(() => {
        closeModal();
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

        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={() => toCloseModal()}
            >
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button type="submit" variant="contained">
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default UpdatePWForm;
