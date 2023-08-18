import { Paper, styled } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  color:
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
}));

export default StyledPaper;
