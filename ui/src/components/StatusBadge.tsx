import { Box } from "@mui/material";

interface StatusBadgeProps {
  status: string;
  bgColor: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, bgColor }) => (
  <Box
    sx={{
      position: "absolute",
      right: -4,
      top: 16,
      padding: "4px 8px",
      borderRadius: "12px 0 0 12px",
      backgroundColor: bgColor,
      color: "#000",
      fontSize: 12,
      fontWeight: 600,
      boxShadow: 2,
    }}
  >
    {status}
  </Box>
);

export default StatusBadge;
