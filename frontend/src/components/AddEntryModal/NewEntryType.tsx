import type { EntryTypes } from "../../types";
import { assertNever } from "../../helper";
import { HealthCheck } from "./Healthcheck";
import { Inpatient } from "./Inpatient";
import { Outpatient } from "./Outpatient";

interface NewEntryTypeProps {
  type: EntryTypes | null;
}

const NewEntryType = ({ type }: NewEntryTypeProps) => {
  if (type != null) {
    switch (type) {
      case "HealthCheck":
        return <HealthCheck />;

      case "Inpatient":
        return <Inpatient />;

      case "Outpatient":
        return <Outpatient />;

      default:
        return assertNever(type);
    }
  }
};

export default NewEntryType;
