import React, { useState } from "react";
import type {
  EntryTypes,
  EntryFormValues,
  BaseEntryForm,
  updateEntryType,
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
import { useTypeStore } from "../../stores/entryTypeStore";

interface NewEntryProps {
  onSubmit?: (id: string, values: EntryFormValues) => void;
  update?: (id: string, value: updateEntryType, entryId: string) => void;
  patientId: string;
}

const NewEntry = ({ onSubmit, update, patientId }: NewEntryProps) => {
  const { reset: resetDate, ...date } = useField("date");
  const { reset: resetDescription, ...description } = useField("text");
  const { reset: resetSpecialist, ...specialist } = useField("text");

  const [code, setCode] = useState<string[]>([]);
  const [type, setType] = useState<EntryTypes>("Inpatient");
  const diagnoses = useDiagnoses();
  const { closeModal } = useModalActions();
  const typeDetails = useTypeStore((state) => state.typeDetails);
  const setField = useTypeStore((state) => state.setField);

  const handleCodeChange = (event: SelectChangeEvent<typeof code>) => {
    const {
      target: { value },
    } = event;
    setCode(typeof value === "string" ? value.split(",") : value);
  };

  const handleCreate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let basicPack: BaseEntryForm = {
      finish: false,
      description: description.value,
      date: date.value,
      specialist: specialist.value,
    };
    if (code.length !== 0) {
      basicPack = { ...basicPack, diagnosisCodes: code };
    }

    onSubmit?.(patientId, {
      ...basicPack,
      type,
      ...typeDetails,
    } as EntryFormValues);

    closeModal();
    resetDate();
    resetDescription();
    resetSpecialist();
  };

  //TODO handleSubmit: to select which logic to use, handleUpdate: using update props to update Entry details

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
          <TextField label="Description" fullWidth required {...description} />
        </div>

        <div>
          <TextField label="Specialist" fullWidth required {...specialist} />
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

        <NewEntryType type={type} />

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
              Save
            </Button>
          </Grid>
          <Grid size="auto">
            <Button
              onClick={() => setField("finish", true)}
              variant="contained"
            >
              Confirm and Lock
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default NewEntry;
