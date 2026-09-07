import { useEmployeeActions } from "../../stores/employeeStore";
import { useLoginEmployee } from "../../stores/loginStore";
import { useField } from "../../hooks/useField";
import { SyntheticEvent } from "react";

const UpdateDetailsForm = () => {
  const { updateEmployeeDetail } = useEmployeeActions();
  const loginEmployee = useLoginEmployee();

  const updateDetails = (e: SyntheticEvent) => {
    e.preventDefault();

    console.log();
  };

  return (
    <>
      <form onSubmit={updateDetails}></form>
    </>
  );
};

export default UpdateDetailsForm;
