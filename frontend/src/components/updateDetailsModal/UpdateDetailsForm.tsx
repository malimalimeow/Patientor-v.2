import { useEmployeeActions } from "../../stores/employeeStore";
import { useLoginEmployee } from "../../stores/loginStore";
import { useField } from "../../hooks/useField";
import { useModalActions } from "../../stores/modalStore";
import { ChangeEvent, SyntheticEvent } from "react";
import { useState } from "react";
import { Gender, Role } from "../../types";
import { useNotiAction } from "../../stores/notificationStore";
import { useShowEmployee } from "../../stores/employeeStore";
import {
  TextField,
  Select,
  MenuItem,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";

interface textField {
  label: string;
  placeholder: string;
  props: {
    type: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement, Element>) => void;
  };
}

const UpdateDetailsForm = () => {
  const { updateEmployeeDetail } = useEmployeeActions();
  const showEmployee = useShowEmployee();
  const { setMessage } = useNotiAction();
  const loginEmployee = useLoginEmployee();
  const { closeModal } = useModalActions();
  const [gender, setGender] = useState<Gender>(
    showEmployee?.gender ?? "female",
  );
  const [role, setRole] = useState<Role>(showEmployee?.role ?? "normal");

  if (!loginEmployee) {
    setMessage("please login");
    return null;
  }
  if (!showEmployee) {
    setMessage("please select an employee");
    return null;
  }
  if (loginEmployee.role !== "admin" && loginEmployee.role !== "master") {
    setMessage("Insufficient permissions");
    return null;
  }

  const { reset: resetName, ...name } = useField("text");
  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetDOB, ...dateOfBirth } = useField("text");
  const { reset: resetNI, ...NI } = useField("text");
  const { reset: resetAddress, ...address } = useField("text");
  const { reset: resetEmergencyContact, ...emergencyContact } =
    useField("text");

  const textFieldArray: textField[] = [
    { label: "Name", placeholder: showEmployee.name, props: name },
    { label: "Title", placeholder: showEmployee.title, props: title },
    {
      label: "Date of Birth",
      placeholder: showEmployee.dateOfBirth,
      props: dateOfBirth,
    },
    { label: "NI", placeholder: showEmployee.NI, props: NI },
    { label: "Address", placeholder: showEmployee.address, props: address },
    {
      label: "Emergency Contact",
      placeholder: showEmployee.emergencyContact,
      props: emergencyContact,
    },
  ];

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
    resetTitle();
    resetDOB();
    resetAddress();
    resetNI();
    resetEmergencyContact();
    setGender(showEmployee.gender);
    setRole(showEmployee.role);
  };

  const toCloseModal = () => {
    closeModal();
    resetAll();
  };

  const updateDetails = async (e: SyntheticEvent) => {
    e.preventDefault();
    const receivedData = {
      name: name.value,
      title: title.value,
      dateOfBirth: dateOfBirth.value,
      address: address.value,
      NI: NI.value,
      emergencyContact: emergencyContact.value,
      ...(gender !== showEmployee.gender && { gender }),
      ...(role !== showEmployee.role && { role }),
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
      await updateEmployeeDetail(showEmployee.id, updateData);
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
      {textFieldArray.map(({ label, placeholder, props }) => (
        <TextField
          slotProps={{
            inputLabel: { shrink: true },
          }}
          key={label}
          label={label}
          placeholder={placeholder}
          fullWidth
          {...props}
        />
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

export default UpdateDetailsForm;
