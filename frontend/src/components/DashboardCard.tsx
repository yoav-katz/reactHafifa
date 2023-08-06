import { Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";
import { BugReport } from "@mui/icons-material";

const DashboardCard: FC = () => {
  return (
    <Card sx={{ width: "15%" }}>
      <CardContent sx={{ width: "100%" }}>
        <BugReport
          sx={{
            border: "1% solid",
            borderRadius: "50%",
          }}
        />
        <Typography>Word of the Day</Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
