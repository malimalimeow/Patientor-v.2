import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import EmergencyIcon from "@mui/icons-material/Emergency";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { assertNever } from "../helper";
import { useToUpdateEntry } from "../stores/patientStore";

export const EntryDetails = () => {
  const entry = useToUpdateEntry();
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
        <div className="entryContainer">
          <p>
            {entry.date}
            <MedicalInformationIcon />
          </p>
          <p>{entry.description}</p>
          <FavoriteIcon sx={{ color: color }} />
          <p>Diagnosed by {entry.specialist}</p>
        </div>
      );
    case "Inpatient":
      return (
        <div className="entryContainer">
          <p>
            {entry.date}
            Diagnosed by {entry.specialist}
            <LocalHospitalIcon />
          </p>
          <p>Description:{entry.description}</p>
          <p>Admission Date:{entry.admissionDate}</p>
          <p>Admission Reason:{entry.admissionReason}</p>
        </div>
      );

    case "Outpatient":
      return (
        <div className="entryContainer">
          <p>
            {entry.date}
            Diagnosed by {entry.department}-{entry.specialist}
            <EmergencyIcon />
          </p>
          <p>Description:{entry.description}</p>
          <p>Chief Complaint:{entry.chiefComplaint}</p>
        </div>
      );

    default:
      return assertNever(entry);
  }
};
