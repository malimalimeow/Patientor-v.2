import { TextField } from "@mui/material";
import { useTypeStore } from "../../stores/entryTypeStore";

export const Outpatient = () => {
  const typeDetails = useTypeStore((state) => state.typeDetails);
  const setField = useTypeStore((state) => state.setField);

  return <></>;
};
