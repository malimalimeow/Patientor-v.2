import { useEffect } from "react";
import { Alert } from "@mui/material";
import { message } from "../types";

interface NotiProps {
  message: message;
  setMessage: React.Dispatch<React.SetStateAction<message>>;
}
const Notification = ({ message, setMessage }: NotiProps) => {
  useEffect(() => {
    if (message.message === "") {
      return;
    }

    const timer = setTimeout(() => {
      setMessage({
        message: "",
        isError: true,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, setMessage]);

  if (message.message === "") {
    return null;
  }

  return (
    <Alert
      style={{ marginTop: 10, marginBottom: 10 }}
      severity={message.isError ? "error" : "success"}
    >
      {message.message}
    </Alert>
  );
};

export default Notification;
