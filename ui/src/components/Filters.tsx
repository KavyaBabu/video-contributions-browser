import React from "react";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";

interface FiltersProps {
  filters: { status: string; sort: string };
  setFilters: (filters: any) => void;
  setPage: (page: number) => void; 
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters, setPage }) => {

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev: any) => ({ ...prev, [field]: value }));
    setPage(1);
  };
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <FormControl size="small" sx={{ minWidth: 140}}>
        <InputLabel sx={{ color: "white" }}>Status</InputLabel>
        <Select
          value={filters.status}
          label="Status"
          onChange={(e) => handleFilterChange("status", e.target.value)}
          sx={{
            color: "white", 
            "& .MuiSelect-icon": {
              color: "white", 
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", 
              },
            },
            "& .MuiMenuItem-root": {
              color: "white",
            },
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="scheduled">Scheduled</MenuItem>
          <MenuItem value="complete">Complete</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel sx={{ color: "white" }}>Sort By</InputLabel>
        <Select
          value={filters.sort}
          label="Sort By"
          onChange={(e) => handleFilterChange("sort", e.target.value)}
          sx={{
            color: "white", 
            "& .MuiSelect-icon": {
              color: "white", 
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", 
              },
            }
          }}
        >
          <MenuItem value="id">ID</MenuItem>
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
