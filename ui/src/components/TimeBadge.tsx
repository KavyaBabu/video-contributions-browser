import React from "react";
import { Box, Typography } from "@mui/material";

interface TimeBadgeProps {
  startTime: string;
  endTime: string;
}

const TimeBadge: React.FC<TimeBadgeProps> = ({ startTime, endTime }) => {
  return (
    <Box
      sx={{
        backgroundColor: "grey.100",
        borderRadius: 1,
        padding: 2,
        mt: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
        <div>
          <Typography variant="caption" color="text.secondary">
            Starts
          </Typography>
          <Typography variant="body2">{new Date(startTime).toLocaleString()}</Typography>
        </div>
        <div>
          <Typography variant="caption" color="text.secondary">
            Ends
          </Typography>
          <Typography variant="body2">{new Date(endTime).toLocaleString()}</Typography>
        </div>
      </Box>
    </Box>
  );
};

export default TimeBadge;
