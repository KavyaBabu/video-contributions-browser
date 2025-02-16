import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import { getContributionStatus } from "../utils/getStatus";
import StatusBadge from "./StatusBadge";
import TimeBadge from "./TimeBadge";
import { motion } from "framer-motion";

const ContributionCard = ({ contribution }: { contribution: any }) => {
  const { title, description, startTime, endTime, owner } = contribution;
  const status = getContributionStatus(startTime, endTime);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card 
      sx={{ 
        borderLeft: `3px solid ${status.bgColor}`, 
        position: "relative", 
        height: `100%`,
        minHeight: 280,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 4,
          } }}>
        <StatusBadge status={status.label} bgColor={status.bgColor} />
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Avatar>{owner[0].toUpperCase()}</Avatar>
            <Typography variant="body2" sx={{ ml: 1 }}>
              {owner}
            </Typography>
          </Box>
          <TimeBadge startTime={startTime} endTime={endTime} />
        </CardContent>
      </Card>
    </motion.div>
   
  );
};

export default ContributionCard;
