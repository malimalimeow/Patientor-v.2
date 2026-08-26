import { useEffect } from "react";
import { Alert } from "@mui/material";
import { useMessage, useNotiAction } from "../stores/notificationStore";

const Notification = () => {
  const message = useMessage();
  const { clearMessage } = useNotiAction();

  useEffect(() => {
    if (message.message === "") {
      return;
    }

    const timer = setTimeout(() => {
      clearMessage();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, clearMessage]);

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
