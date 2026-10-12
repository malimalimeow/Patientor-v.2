import React, { useState } from "react";
import type {
  EntryTypes,
  EntryFormValues,
  BaseEntryForm,
  UpdateEntryType,
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
import { usePatientActions, useToUpdateEntry } from "../../stores/patientStore";

interface NewEntryProps {
  onSubmit?: (id: string, values: EntryFormValues) => Promise<void>;
  update?: (
    id: string,
    value: UpdateEntryType,
    entryId: string,
  ) => Promise<void>;
  patientId: string;
}

const NewEntry = ({ onSubmit, update, patientId }: NewEntryProps) => {
  const toUpdateEntry = useToUpdateEntry();
  const { selectedEntry } = usePatientActions();
  const { reset: resetDate, ...date } = useField("date", toUpdateEntry?.date);
  const { reset: resetDescription, ...description } = useField(
    "text",
    toUpdateEntry?.description,
  );
  const { reset: resetSpecialist, ...specialist } = useField(
    "text",
    toUpdateEntry?.specialist,
  );

  const [code, setCode] = useState<string[]>(
    toUpdateEntry?.diagnosisCodes ?? [],
  );
  const [type, setType] = useState<EntryTypes>(
    toUpdateEntry?.type ?? "Inpatient",
  );
  const entryID = toUpdateEntry?.id;

  const diagnoses = useDiagnoses();
  const { closeModal } = useModalActions();
  const typeDetails = useTypeStore((state) => state.typeDetails);

  const handleCodeChange = (event: SelectChangeEvent<typeof code>) => {
    const {
      target: { value },
    } = event;
    setCode(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = async (e: React.SubmitEvent | null, toLock: boolean) => {
    if (e) e.preventDefault();
    console.log(toLock);

    let basicPack: BaseEntryForm = {
      finish: toLock,
      description: description.value,
      date: date.value,
      specialist: specialist.value,
    };
    if (code.length !== 0) {
      basicPack = { ...basicPack, diagnosisCodes: code };
    }

    const fullPayload = { type, ...typeDetails, ...basicPack };

    if (toUpdateEntry !== null) {
      await update?.(
        patientId,
        fullPayload as UpdateEntryType,
        entryID as string,
      );
    } else {
      await onSubmit?.(patientId, fullPayload as EntryFormValues);
    }

    closeModal();
    resetDate();
    resetDescription();
    resetSpecialist();
    selectedEntry(null);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, false)}>
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
              onClick={() => handleSubmit(null, true)}
              type="button"
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
