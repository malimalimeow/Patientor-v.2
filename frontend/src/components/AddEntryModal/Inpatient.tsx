import { TextField } from "@mui/material";
import { useTypeStore } from "../../stores/entryTypeStore";

export const Inpatient = () => {
  const typeDetails = useTypeStore((state) => state.typeDetails);
  const setField = useTypeStore((state) => state.setField);
  const handleInputChange =
    (Field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setField(Field, e.target.value);

  return (
    <div>
      <TextField
        fullWidth
        label="admissionDate"
        slotProps={{ inputLabel: { shrink: true } }}
        id="admissionDate"
        type="date"
        value={typeDetails.admissionDate || ""}
        required
        onChange={handleInputChange("admissionDate")}
      />

      <TextField
        fullWidth
        label="admissionReason"
        id="admissionReason"
        type="text"
        value={typeDetails.admissionReason || ""}
        required
        onChange={handleInputChange("admissionReason")}
      />

      <TextField
        fullWidth
        label="dischargeDate"
        slotProps={{ inputLabel: { shrink: true } }}
        id="dischargeDate"
        type="date"
        value={typeDetails.dischargeDate || ""}
        onChange={handleInputChange("dischargeDate")}
      />

      <TextField
        fullWidth
        label="ward"
        id="ward"
        type="text"
        value={typeDetails.ward || ""}
        onChange={handleInputChange("ward")}
      />

      <TextField
        fullWidth
        label="bedNumber"
        id="bedNumber"
        type="text"
        value={typeDetails.bedNumber || ""}
        onChange={handleInputChange("bedNumber")}
      />

      <TextField
        fullWidth
        label="dischargeSummary"
        id="dischargeSummary"
        type="text"
        value={typeDetails.dischargeSummary || ""}
        onChange={handleInputChange("dischargeSummary")}
      />

      <TextField
        fullWidth
        label="dischargeStatus"
        id="dischargeStatus"
        type="text"
        value={typeDetails.dischargeStatus || ""}
        onChange={handleInputChange("dischargeStatus")}
      />

      <TextField
        fullWidth
        label="followUpInstruction"
        id="followUpInstruction"
        type="text"
        value={typeDetails.followUpInstruction || ""}
        onChange={handleInputChange("followUpInstruction")}
      />
    </div>
  );
};
