import { useRouteError } from "react-router-dom";
import { Stack } from "@mui/material";

interface RouteError {
  statusText?: string;
  message?: string;
}

const ErrorPage = () => {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <Stack textAlign="center" sx={{ direction: "ltr" }}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Stack>
  );
};

export default ErrorPage;
