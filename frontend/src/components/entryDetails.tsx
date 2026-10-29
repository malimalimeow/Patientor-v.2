import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import EmergencyIcon from "@mui/icons-material/Emergency";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { assertNever } from "../helper";
import { usePatientActions } from "../stores/patientStore";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useModalActions, useModalOpen } from "../stores/modalStore";
import { Entry } from "../types";
import UpdateEntryModal from "./UpdateEntryModal";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const UpdateButton = ({ entry }: { entry: Entry }) => {
  const { selectedEntry } = usePatientActions();
  const { openModal } = useModalActions();
  const modalOpen = useModalOpen();
  const entryFinish = entry.finish;
  console.log(entryFinish);
  const handleUpdateEntry = () => {
    selectedEntry(entry);
    openModal("updateEntry");
  };

  return (
    <>
      {modalOpen === "updateEntry" && <UpdateEntryModal />}
      {entryFinish === false ? (
        <>
          <Button onClick={handleUpdateEntry}>Update Record</Button>
          <LockOpenIcon />
        </>
      ) : (
        <Typography>
          Read Only
          <LockIcon />
        </Typography>
      )}
    </>
  );
};

export const EntryDetails = ({ entry }: { entry: Entry }) => {
  if (!entry) {
    return;
  }
  switch (entry?.type) {
    case "HealthCheck":
      const color =
        entry.healthCheckRating === 0
          ? "#2E7D32"
          : entry.healthCheckRating === 1
            ? "#ED6C02"
            : entry.healthCheckRating === 2
              ? "#D32F2F"
              : "#C62828";
      return (
        <div>
          <Accordion slotProps={{ heading: { component: "h4" } }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${entry._id}-content`}
              id={`panel${entry._id}-content`}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {entry.date} {entry.type}
                </Typography>

                <Typography variant="body1">{entry.description}</Typography>

                <Typography variant="body2">
                  <MedicalInformationIcon />
                  {"   "}
                  Diagnosed by {entry.specialist}
                  <UpdateButton entry={entry} />
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Health Check Rating:{entry.healthCheckRating}{" "}
                <FavoriteIcon sx={{ color: color }} />
              </Typography>

              <Divider sx={{ mb: 2, mt: 2, gap: 2 }} />

              <Typography variant="subtitle1">DiagnosisCodes</Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {entry.diagnosisCodes?.map((code) => (
                  <Chip
                    key={code}
                    label={code}
                    size="medium"
                    variant="outlined"
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>
      );
    case "Inpatient":
      return (
        <div>
          <Accordion slotProps={{ heading: { component: "h4" } }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${entry._id}-content`}
              id={`panel${entry._id}-content`}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {entry.date} {entry.type}
                </Typography>

                <Typography variant="body1">{entry.description}</Typography>

                <Typography variant="body2">
                  <LocalHospitalIcon />
                  {"   "}
                  Diagnosed by {entry.specialist}
                  <UpdateButton entry={entry} />
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Admission
                </Typography>
                <Typography>Date:{entry.admissionDate}</Typography>
                <Typography>Reason:{entry.admissionReason}</Typography>
                {entry.ward && <Typography>Ward: {entry.ward}</Typography>}
                {entry.bedNumber && (
                  <Typography>Bed number:{entry.bedNumber}</Typography>
                )}
              </Box>

              <Divider sx={{ mb: 2, mt: 2, gap: 2 }} />

              {entry.dischargeDate && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Discharge
                  </Typography>

                  <Typography>Discharge Date:{entry.dischargeDate}</Typography>

                  {entry.dischargeStatus && (
                    <Typography>
                      Discharge Status:{entry.dischargeStatus}
                    </Typography>
                  )}
                  {entry.dischargeSummary && (
                    <Typography>{entry.dischargeSummary}</Typography>
                  )}
                </Box>
              )}

              <Divider sx={{ mb: 2, mt: 2, gap: 2 }} />

              {entry.followUpInstruction && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Follow Up Instruction
                  </Typography>
                  <Typography>{entry.followUpInstruction}</Typography>
                </Box>
              )}

              <Divider sx={{ mb: 2, mt: 2, gap: 2 }} />

              <Typography variant="subtitle1">DiagnosisCodes</Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {entry.diagnosisCodes?.map((code) => (
                  <Chip
                    key={code}
                    label={code}
                    size="medium"
                    variant="outlined"
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>
      );

    case "Outpatient":
      return (
        <div>
          <Accordion slotProps={{ heading: { component: "h4" } }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${entry._id}-content`}
              id={`panel${entry._id}-content`}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {entry.date} {entry.type}
                </Typography>

                <Typography variant="body1">{entry.description}</Typography>

                <Typography variant="body2">
                  <EmergencyIcon /> {"   "}Diagnosed by {entry.specialist}(
                  {entry.department})
                  <UpdateButton entry={entry} />
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Chief Complaint:{entry.chiefComplaint}</Typography>
              {entry.followUpDate && (
                <Typography>Follow up Date:{entry.followUpDate}</Typography>
              )}

              <Divider sx={{ mb: 2, mt: 2, gap: 2 }} />

              {entry.vitalSigns && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Vital Sign{" "}
                  </Typography>
                  <Stack spacing={1}>
                    <Typography>bp: {entry.vitalSigns.bp}</Typography>
                    <Typography>pulse: {entry.vitalSigns.pulse}</Typography>
                    <Typography>
                      temperature: {entry.vitalSigns.temperature}
                    </Typography>
                  </Stack>
                </Box>
              )}

              <Divider sx={{ my: 2 }} />

              {entry.prescription && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Prescription
                  </Typography>
                  {entry.prescription?.map((p) => (
                    <Stack spacing={1}>
                      <Typography>Medication:{p.medication}</Typography>
                      <Typography>Dosage:{p.dosage}</Typography>
                      <Typography>Frequency:{p.frequency} </Typography>
                    </Stack>
                  ))}
                </Box>
              )}

              <Divider sx={{ mb: 2, mt: 2, gap: 2 }} />

              <Typography variant="subtitle1">DiagnosisCodes</Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {entry.diagnosisCodes?.map((code) => (
                  <Chip
                    key={code}
                    label={code}
                    size="medium"
                    variant="outlined"
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>
      );

    default:
      return assertNever(entry);
  }
};
