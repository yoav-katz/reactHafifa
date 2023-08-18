import api from "@/api";
import StyledPaper from "@/components/StyledPaper";
import TableWithPagination from "@/components/TableWithPagination";
import Title from "@/components/Title";
import { Container } from "@mui/material";

const headers = [
  { name: "firstName", realName: "שם פרטי" },
  { name: "lastName", realName: "שם משפחה" },
  { name: "gender", realName: "מגדר" },
  { name: "email", realName: "מייל" },
  { name: "phoneNumber", realName: "מספר טלפון" },
  { name: "address", realName: "כתובת" },
];

const UsersView = () => {
  return (
    <Container sx={{ mt: 4, mb: 4, height: "calc(100vh - 8rem)" }}>
      <StyledPaper>
        <Title>לקוחות</Title>
        <TableWithPagination
          headers={headers}
          apiFunction={api.customers().getWithPagination}
        ></TableWithPagination>
      </StyledPaper>
    </Container>
  );
};

export default UsersView;
