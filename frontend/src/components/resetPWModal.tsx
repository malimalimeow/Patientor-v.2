import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import Notification from "./notification";
import { useField } from "../hooks/useField";
import { useModalOpen, useModalActions } from "./../stores/modalStore";
import { useNotiAction } from "../stores/notificationStore";
import axios from "axios";
import { useParams } from "react-router-dom";
import { resetPasswordForm } from "../types";
import { SyntheticEvent } from "react";
import { useEmployeeActions } from "../stores/employeeStore";

const ResetPasswordModal = () => {
  const modalOpen = useModalOpen();
  const { closeModal } = useModalActions();
  const { reset, ...resetPassword } = useField("password");
  const { setMessage } = useNotiAction();
  const { resetEmployeePassword } = useEmployeeActions();
  const { id } = useParams();

  const toCloseModal = () => {
    closeModal();
    reset();
  };

  const handleResetPW = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!id) {
      setMessage("Employee not found");
      return;
    }
    try {
      const data: resetPasswordForm = {
        password: resetPassword.value,
      };
      await resetEmployeePassword(id, data);
      setMessage("reset Success", false);

      reset();

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
    <Dialog
      fullWidth={true}
      open={modalOpen === "resetPW"}
      onClose={() => closeModal()}
    >
      <DialogTitle>Reset Password</DialogTitle>
      <Divider />
      <DialogContent>
        <Notification />
        <form onSubmit={handleResetPW}>
          <TextField label="resetPW" fullWidth {...resetPassword}></TextField>
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
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordModal;
