import React, { useState } from "react";
import type {
  Discharge,
  SickLeave,
  EntryTypes,
  EntryFormValues,
  HealthCheckRating,
  BaseEntryForm,
  OccupationalForm,
} from "../../types";
import { EntryType } from "../../types";
import NewEntryType from "./NewEntryType";
import { useDiagnoses } from "../../stores/diagnosesStore";
import { useModalActions } from "../../stores/modalStore";
import { useField } from "../../hooks/useField";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  Button,
  Chip,
  Grid,
} from "@mui/material";

interface NewEntryProps {
  onSubmit: (id: string, values: EntryFormValues) => void;
  patientId: string;
}

const NewEntry = ({ onSubmit, patientId }: NewEntryProps) => {
  const { reset: resetDate, ...date } = useField("text");
  const { reset: resetDescription, ...description } = useField("text");
  const { reset: resetSpecialist, ...specialist } = useField("text");
  const { reset: resetEmployerName, ...employerName } = useField("text");

  const [code, setCode] = useState<string[]>([]);
  const [type, setType] = useState<EntryTypes>("Hospital");
  const [rating, setRating] = useState<HealthCheckRating>(0);
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: "",
    endDate: "",
  });
  const diagnoses = useDiagnoses();
  const { closeModal } = useModalActions();

  const handleCodeChange = (event: SelectChangeEvent<typeof code>) => {
    const {
      target: { value },
    } = event;
    setCode(typeof value === "string" ? value.split(",") : value);
  };

  const handleCreate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let basicPack: BaseEntryForm = {
      description: description.value,
      date: date.value,
      specialist: specialist.value,
    };
    if (code.length !== 0) {
      basicPack = { ...basicPack, diagnosisCodes: code };
    }

    if (type === "Hospital") {
      onSubmit(patientId, {
        ...basicPack,
        type: "Hospital",
        discharge: discharge,
      });
    } else if (type === "HealthCheck") {
      onSubmit(patientId, {
        ...basicPack,
        type: "HealthCheck",
        healthCheckRating: rating,
      });
    } else if (type === "OccupationalHealthcare") {
      let OccupationalPack: OccupationalForm = {
        ...basicPack,
        type: "OccupationalHealthcare",
        employerName: employerName.value,
      };

      if (sickLeave.startDate !== "" && sickLeave.endDate !== "") {
        OccupationalPack = { ...OccupationalPack, sickLeave: sickLeave };
      }

      onSubmit(patientId, OccupationalPack);
      closeModal();
      resetDate();
      resetDescription();
      resetEmployerName();
      resetSpecialist();
    }
  };

  return (
    <div>
      <form onSubmit={handleCreate}>
        <div>
          <TextField
            select
            fullWidth
            label="type"
            id="type"
            value={type}
            required
            onChange={({ target }) => setType(target.value as EntryTypes)}
          >
            {Object.values(EntryType).map((e) => (
              <MenuItem key={e} value={e}>
                {e}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <TextField
            label="Date"
            slotProps={{ inputLabel: { shrink: true } }}
            required
            {...date}
          />
        </div>

        <div>
          <TextField label="Description" required {...description} />
        </div>

        <div>
          <TextField label="Specialist" required {...specialist} />
        </div>

        <div>
          <FormControl fullWidth>
            <InputLabel id="code-label">Diagnoses code</InputLabel>
            <Select
              labelId="code-label"
              id="code"
              multiple
              value={code}
              onChange={handleCodeChange}
              renderValue={(selected) =>
                selected.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    variant="outlined"
                    onDelete={() => {
                      setCode(code.filter((c) => c !== s));
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  />
                ))
              }
            >
              {diagnoses.map((d) => (
                <MenuItem key={d.code} value={d.code}>
                  {d.code}-{d.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <NewEntryType
          type={type}
          rating={rating}
          discharge={discharge}
          employerNameField={employerName}
          sickLeave={sickLeave}
          setRating={setRating}
          setDischarge={setDischarge}
          setSickLeave={setSickLeave}
        />

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

export default NewEntry;
