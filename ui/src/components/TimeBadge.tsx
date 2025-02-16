import React from "react";
import { Box, Typography, Stack, Divider, useTheme } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { formatDistance } from 'date-fns';

interface TimeBadgeProps {
  startTime: string;
  endTime: string;
}

const TimeBadge: React.FC<TimeBadgeProps> = ({ startTime, endTime }) => {
  const theme = useTheme();
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 2,
        p: 2,
        mt: 2,
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: theme.shadows[1],
        },
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        <AccessTimeIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'text-bottom' }} />
        Event Timeline
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} divider={<Divider orientation="vertical" flexItem />}>
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1} color="success.main">
            <CalendarTodayIcon sx={{ fontSize: 14 }} />
            <Typography variant="overline">Starts</Typography>
          </Stack>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            {startDate.toLocaleDateString()}
          </Typography>
          <Typography color="text.secondary">
            {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1} color="error.main">
            <CalendarTodayIcon sx={{ fontSize: 14 }} />
            <Typography variant="overline">Ends</Typography>
          </Stack>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            {endDate.toLocaleDateString()}
          </Typography>
          <Typography color="text.secondary">
            {endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        </Box>
      </Stack>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        {formatDistance(startDate, endDate, { addSuffix: false })} duration
      </Typography>
    </Box>
  );
};

export default TimeBadge;