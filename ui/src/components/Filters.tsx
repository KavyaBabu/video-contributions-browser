import React from "react";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";

interface FiltersProps {
  filters: { status: string; sort: string };
  setFilters: (filters: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filters.status}
          label="Status"
          onChange={(e) => setFilters((prev: any) => ({ ...prev, status: e.target.value }))}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="scheduled">Scheduled</MenuItem>
          <MenuItem value="complete">Complete</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={filters.sort}
          label="Sort By"
          onChange={(e) => setFilters((prev: any) => ({ ...prev, sort: e.target.value }))}
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="startTime">Start Time</MenuItem>
          <MenuItem value="endTime">End Time</MenuItem>
          <MenuItem value="owner">Owner</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;
