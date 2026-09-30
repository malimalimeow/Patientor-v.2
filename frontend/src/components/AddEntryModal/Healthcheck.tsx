import { TextField, MenuItem } from "@mui/material";
import { HealthCheckRatings } from "../../types";
import type { HealthCheckRating } from "../../types";

import { useTypeStore } from "../../stores/entryTypeStore";

export const HealthCheck = () => {
  const typeDetails = useTypeStore((state) => state.typeDetails);
  const setField = useTypeStore((state) => state.setField);

  return (
    <>
      <div>
        <TextField
          select
          fullWidth
          label="HealthCheckRating"
          id="HealthCheckRating"
          value={typeDetails.rating || ""}
          required
          onChange={({ target }) =>
            setField("rating", Number(target.value) as HealthCheckRating)
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
