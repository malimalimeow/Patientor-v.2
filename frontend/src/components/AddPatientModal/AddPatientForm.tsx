import { useState, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { useModalActions } from "../../stores/modalStore";
import { PatientFormValues, Gender } from "../../types";
import { useField } from "../../hooks/useField";

interface GenderOption {
  value: Gender;
  label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddPatientForm = ({
  onSubmit,
}: {
  onSubmit: (values: PatientFormValues) => Promise<void>;
}) => {
  const { reset: resetName, ...name } = useField("text");
  const { reset: resetOccupation, ...occupation } = useField("text");
  const { reset: resetDOB, ...dateOfBirth } = useField("text");
  const [gender, setGender] = useState<Gender>("female");
  const { closeModal } = useModalActions();

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

  const addPatient = async (event: SyntheticEvent) => {
    event.preventDefault();
    await onSubmit({
      name: name.value,
      occupation: occupation.value,
      dateOfBirth: dateOfBirth.value,
      gender: gender,
    });
    resetDOB();
    resetName();
    resetOccupation();
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField label="Name" fullWidth {...name} />

        <TextField
          label="Date of birth"
          placeholder="YYYY-MM-DD"
          fullWidth
          {...dateOfBirth}
        />

        <TextField label="Occupation" fullWidth {...occupation} />

        <InputLabel sx={{ marginTop: 2.5 }}>Gender</InputLabel>
        <Select
          label="Gender"
          fullWidth
          value={gender}
          onChange={onGenderChange}
        >
          {genderOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={closeModal}
            >
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPatientForm;
