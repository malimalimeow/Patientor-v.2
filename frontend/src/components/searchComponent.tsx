import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useEmployeeActions } from "../stores/employeeStore";
import { usePatientActions } from "../stores/patientStore";
import { ChangeEvent } from "react";

interface SearchProps {
  placeholder: string;
  usedPage: string;
}

export default function CustomizedInputBase({
  placeholder,
  usedPage,
}: SearchProps) {
  const { setFilter: patientFilter } = usePatientActions();
  const { setFilter: employeeFilter } = useEmployeeActions();

  const filterFunction = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    if (usedPage === "employee") {
      employeeFilter(e.target.value);
    } else if (usedPage === "patient") {
      patientFilter(e.target.value);
    }
  };

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ "aria-label": `${placeholder}` }}
        onChange={(e) => filterFunction(e)}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
