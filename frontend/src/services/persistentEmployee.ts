import type{token} from "../types"

const getEmployee = () => {
  const employeeJSON = window.localStorage.getItem("loggedEmployee");

  return employeeJSON ? JSON.parse(employeeJSON) : null;
};

const saveEmployee = (employee:token) => {
  window.localStorage.setItem("loggedEmployee", JSON.stringify(employee));
  console.log(employee, "login");
};

const removeEmployee = () => {
  window.localStorage.removeItem("loggedEmployee");
  console.log("employee leave");
};

export { getEmployee, saveEmployee, removeEmployee };
