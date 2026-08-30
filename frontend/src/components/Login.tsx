import { useField } from "../hooks/useField";
import { TextField } from "@mui/material";
import { useLoginAction } from "../stores/loginStore";
import { useNotiAction } from "../stores/notificationStore";
import Notification from "./notification";
import { SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");
  const { setMessage } = useNotiAction();
  const { toLogin } = useLoginAction();
  const navigate = useNavigate();
  const toPatient = () => navigate("/patients");
  const loginEmployee = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await toLogin({ username: username.value, password: password.value });
      setMessage(`${username.value} login successfully`, false);
      toPatient();
      resetUsername();
      resetPassword();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        resetUsername();
        resetPassword();
        if (e?.response?.data && typeof e?.response?.data === "object") {
          const firstError = e?.response?.data.error[0];
          const message = `Something went wrong. Error: ${firstError?.message}`;
          setMessage(`${message}`);
        } else {
          setMessage("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setMessage("Unknown error");
      }
    }
  };

  return (
    <>
      <Notification />
      <form onSubmit={(e) => loginEmployee(e)}>
        <TextField label="Username" fullWidth {...username} />
        <TextField label="password" fullWidth {...password} />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
