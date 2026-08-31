import { TextField, Select, MenuItem, Grid, Button } from "@mui/material";
import { useField } from "../../hooks/useField";
import { Gender, NewEmployeeForm, Role } from "../../types";
import { SyntheticEvent, useState } from "react";
import { ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";
import { useModalActions } from "../../stores/modalStore";

interface textField {
  label: string;
  props: {
    type: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement, Element>) => void;
  };
}

const Employee = ({
  onSubmit,
}: {
  onSubmit: (values: NewEmployeeForm) => Promise<void>;
}) => {
  const { closeModal } = useModalActions();
  const { reset: resetName, ...name } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");
  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetDOB, ...dateOfBirth } = useField("text");
  const { reset: resetNI, ...NI } = useField("text");
  const { reset: resetAddress, ...address } = useField("text");
  const { reset: resetEmergencyContact, ...emergencyContact } =
    useField("text");

  const textFieldArray: textField[] = [
    { label: "Name", props: name },
    { label: "Password", props: password },
    { label: "Title", props: title },
    { label: "Date of Birth", props: dateOfBirth },
    { label: "NI", props: NI },
    { label: "Address", props: address },
    { label: "Emergency Contact", props: emergencyContact },
  ];

  const [gender, setGender] = useState<Gender>("female");
  const [role, setRole] = useState<Role>("normal");

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

  const onRoleChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const role = Object.values(Role).find((g) => g === value);
      if (role) {
        setRole(role);
      }
    }
  };

  const resetAll = () => {
    resetName();
    resetPassword();
    resetTitle();
    resetDOB();
    resetAddress();
    resetNI();
    resetEmergencyContact();
    setGender("female");
    setRole("normal");
  };

  const addNewEmployee = async (e: SyntheticEvent) => {
    e.preventDefault();

    await onSubmit({
      name: name.value,
      password: password.value,
      title: title.value,
      dateOfBirth: dateOfBirth.value,
      address: address.value,
      NI: NI.value,
      emergencyContact: emergencyContact.value,
      gender: gender,
      role: role,
    });
    resetAll();
  };

  return (
    <form onSubmit={addNewEmployee}>
      {textFieldArray.map(({ label, props }) => (
        <TextField key={label} label={label} fullWidth {...props} />
      ))}

      <Select label="Gender" fullWidth value={gender} onChange={onGenderChange}>
        {Object.values(Gender).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>

      <Select label="Role" fullWidth value={role} onChange={onRoleChange}>
        {Object.values(Role).map((option) => (
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
  );
};
export default Employee;
