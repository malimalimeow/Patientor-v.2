import { usePatientActions } from "../../stores/patientStore";
import { useLoginEmployee } from "../../stores/loginStore";
import { useField } from "../../hooks/useField";
import { useModalActions } from "../../stores/modalStore";
import { SyntheticEvent } from "react";
import { useState } from "react";
import { Gender } from "../../types";
import { useNotiAction } from "../../stores/notificationStore";
import { useShowPatient } from "../../stores/patientStore";
import {
  TextField,
  Select,
  MenuItem,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";

const UpdatePatientForm = () => {
  const { updatePatientDetails } = usePatientActions();
  const showPatient = useShowPatient();
  const { setMessage } = useNotiAction();
  const loginEmployee = useLoginEmployee();
  const { closeModal } = useModalActions();
  const [gender, setGender] = useState<Gender>(showPatient?.gender ?? "female");

  if (!loginEmployee) {
    setMessage("please login");
    return null;
  }
  if (!showPatient) {
    setMessage("please select patient");
    return null;
  }

  const { reset: resetName, ...name } = useField("text");
  const { reset: resetDOB, ...dateOfBirth } = useField("text");
  const { reset: resetOccupation, ...occupation } = useField("text");

  const onGenderChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const gender = Object.values(Gender).find((g) => g === value);
      if (gender) {
        setGender(gender);
      }
    }
  };

  const resetAll = () => {
    resetName();
    resetDOB();
    setGender(showPatient.gender);
  };

  const toCloseModal = () => {
    closeModal();
    resetAll();
  };

  const updateDetails = async (e: SyntheticEvent) => {
    e.preventDefault();
    const receivedData = {
      name: name.value,
      occupation: occupation.value,
      dateOfBirth: dateOfBirth.value,
      ...(gender !== showPatient.gender && { gender }),
    };

    const filterData = Object.entries(receivedData).filter(
      ([_, value]) => value !== "" && value !== undefined,
    );
    const updateData = Object.fromEntries(filterData);

    if (Object.keys(updateData).length === 0) {
      setMessage("No changes detected");
      return;
    }

    try {
      await updatePatientDetails(showPatient.id, updateData);
      setMessage("Update successful", false);
      resetAll();
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
    <form onSubmit={updateDetails}>
      <TextField
        slotProps={{
          inputLabel: { shrink: true },
        }}
        label="name"
        placeholder={showPatient.name}
        fullWidth
        {...name}
      />

      <TextField
        slotProps={{
          inputLabel: { shrink: true },
        }}
        label="DOB"
        placeholder={showPatient.dateOfBirth}
        fullWidth
        {...dateOfBirth}
      />

      <TextField
        slotProps={{
          inputLabel: { shrink: true },
        }}
        label="Occupation"
        placeholder={showPatient.occupation}
        fullWidth
        {...occupation}
      />

      <Select label="Gender" fullWidth value={gender} onChange={onGenderChange}>
        {Object.values(Gender).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>

      <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
        <Grid size="auto">
          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={toCloseModal}
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
  );
};

export default UpdatePatientForm;
