import type { EntryTypes, Discharge, SickLeave } from "../types";
import { assertNever } from "../helper";
import { TextField, MenuItem } from "@mui/material";
import { HealthCheckRatings } from "../types";
import type { HealthCheckRating } from "../types";

interface NewEntryTypeProps {
  type: EntryTypes | null;
  setRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
  setDischarge: React.Dispatch<React.SetStateAction<Discharge>>;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  setSickLeave: React.Dispatch<React.SetStateAction<SickLeave>>;
  rating: HealthCheckRating;
  discharge: Discharge;
  employerName: string;
  sickLeave: SickLeave;
}
const NewEntryType = ({
  type,
  setRating,
  setDischarge,
  setEmployerName,
  setSickLeave,
  rating,
  discharge,
  employerName,
  sickLeave,
}: NewEntryTypeProps) => {
  if (type != null) {
    switch (type) {
      case "HealthCheck":
        return (
          <>
            <div>
              <TextField
                select
                fullWidth
                label="HealthCheckRating"
                id="HealthCheckRating"
                value={rating}
                required
                onChange={({ target }) =>
                  setRating(Number(target.value) as HealthCheckRating)
                }
              >
                {Object.entries(HealthCheckRatings).map(([key, value]) => (
                  <MenuItem key={value} value={value}>
                    {value}-{key}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </>
        );

      case "Hospital":
        return (
          <>
            <p>Discharge</p>
            <div>
              <TextField
                slotProps={{ inputLabel: { shrink: true } }}
                label="Discharge Date"
                value={discharge.date}
                id="dischargeDate"
                type="date"
                required
                onChange={({ target }) => {
                  setDischarge((prev) => ({ ...prev, date: target.value }));
                }}
              ></TextField>
            </div>

            <div>
              <TextField
                label="criteria"
                value={discharge.criteria}
                id="dischargeCriteria"
                type="text"
                required
                onChange={({ target }) => {
                  setDischarge((prev) => ({ ...prev, criteria: target.value }));
                }}
              ></TextField>
            </div>
          </>
        );

      case "OccupationalHealthcare":
        return (
          <>
            <div>
              <TextField
                label="employerName"
                value={employerName}
                id="employerName"
                type="text"
                required
                onChange={({ target }) => setEmployerName(target.value)}
              ></TextField>
            </div>

            <p>Sick Leave</p>
            <div>
              <TextField
                slotProps={{ inputLabel: { shrink: true } }}
                label="Start Date"
                value={sickLeave.startDate}
                id="startDate"
                type="date"
                onChange={({ target }) => {
                  setSickLeave((prev) => ({
                    ...prev,
                    startDate: target.value,
                  }));
                }}
              ></TextField>

              <TextField
                slotProps={{ inputLabel: { shrink: true } }}
                label="End Date"
                value={sickLeave.endDate}
                id="endDate"
                type="date"
                onChange={({ target }) => {
                  setSickLeave((prev) => ({ ...prev, endDate: target.value }));
                }}
              ></TextField>
            </div>
          </>
        );

      default:
        return assertNever(type);
    }
  }
};

export default NewEntryType;
