import { TextField, Button } from "@mui/material";
import { useTypeStore } from "../../stores/entryTypeStore";
import { prescription, vitalSigns } from "../../types";

export const Outpatient = () => {
  const typeDetails = useTypeStore((state) => state.typeDetails);
  const setField = useTypeStore((state) => state.setField);

  const handleInputChange =
    (Field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setField(Field, e.target.value);

  const handleVitalSign = (key: keyof vitalSigns, value: any) => {
    setField("vitalSigns", { ...typeDetails.vitalSigns, [key]: value });
  };

  const handlePrescriptionChange =
    (Field: string, index: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentList: prescription[] = typeDetails.prescription || [];
      const updateList: prescription[] = [...currentList];

      updateList[index] = { ...updateList[index], [Field]: e.target.value };

      setField("prescription", updateList);
    };

  const addPrescription = () => {
    setField("prescription", [
      ...(typeDetails.prescription || []),
      { medication: "", dosage: "", frequency: "" },
    ]);
  };

  return (
    <div>
      <TextField
        fullWidth
        label="department"
        id="department"
        type="text"
        value={typeDetails.department || ""}
        required
        onChange={handleInputChange("department")}
      />

      <TextField
        fullWidth
        label="chiefComplaint"
        id="chiefComplaint"
        type="text"
        value={typeDetails.chiefComplaint || ""}
        required
        onChange={handleInputChange("chiefComplaint")}
      />

      <TextField
        fullWidth
        label="bp"
        id="bp"
        type="text"
        value={typeDetails.vitalSigns?.bp || ""}
        onChange={(e) => handleVitalSign("bp", e.target.value)}
      />

      <TextField
        fullWidth
        label="pulse"
        id="pulse"
        type="number"
        value={typeDetails.vitalSigns?.pulse || ""}
        onChange={(e) => handleVitalSign("pulse", e.target.value)}
      />

      <TextField
        fullWidth
        label="temperature"
        id="temperature"
        type="number"
        value={typeDetails.vitalSigns?.temperature || ""}
        onChange={(e) => handleVitalSign("temperature", e.target.value)}
      />

      <TextField
        fullWidth
        label="dischargeSummary"
        id="dischargeSummary"
        type="text"
        value={typeDetails.dischargeSummary || ""}
        onChange={handleInputChange("dischargeSummary")}
      />

      <p>Prescription</p>
      {(typeDetails.prescription || []).map((p: prescription, i: number) => (
        <div>
          <TextField
            label="medication"
            id="medication"
            type="text"
            value={p.medication || ""}
            onChange={handlePrescriptionChange("medication", i)}
          />

          <TextField
            label="dosage"
            id="dosage"
            type="text"
            value={p.dosage || ""}
            onChange={handlePrescriptionChange("dosage", i)}
          />

          <TextField
            label="frequency"
            id="frequency"
            type="text"
            value={p.frequency || ""}
            onChange={handlePrescriptionChange("frequency", i)}
          />
        </div>
      ))}

      <Button onClick={() => addPrescription()}>+ Add medication </Button>

      <TextField
        fullWidth
        slotProps={{ inputLabel: { shrink: true } }}
        label="followUpDate"
        id="followUpDate"
        type="date"
        value={typeDetails.followUpDate || ""}
        onChange={handleInputChange("followUpDate")}
      />
    </div>
  );
};
