import { TextField, MenuItem } from "@mui/material";
import { HealthCheckRatings } from "../../types";
import type { HealthCheckRating } from "../../types";

import { useTypeStore } from "../../stores/entryTypeStore";
import { useToUpdateEntry } from "../../stores/patientStore";
import { useEffect } from "react";

export const HealthCheck = () => {
  const typeDetails = useTypeStore((state) => state.typeDetails);
  const setField = useTypeStore((state) => state.setField);
  const toUpdateEntry = useToUpdateEntry();

  useEffect(() => {
    if (toUpdateEntry !== null) {
      Object.entries(toUpdateEntry).map(([key, value]) => setField(key, value));
    }
  }, [toUpdateEntry]);

  return (
    <>
      <div>
        <TextField
          select
          fullWidth
          label="HealthCheckRating"
          id="HealthCheckRating"
          value={typeDetails.healthCheckRating ?? ""}
          required
          onChange={({ target }) =>
            setField(
              "healthCheckRating",
              Number(target.value) as HealthCheckRating,
            )
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
};
