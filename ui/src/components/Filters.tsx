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

  const selectStyles = {
    color: "white",
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.8)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiSvgIcon-root": {
      color: "white",
    },
  };

  const menuItemStyles = {
    "&.MuiMenuItem-root": {
      color: "text.primary",
    },
    "&.Mui-selected": {
      backgroundColor: "rgba(30, 41, 59, 0.08)",
    },
    "&:hover": {
      backgroundColor: "rgba(30, 41, 59, 0.04)",
    },
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel 
          sx={{ 
            color: "white",
            "&.Mui-focused": {
              color: "white",
            }
          }}
        >
          Status
        </InputLabel>
        <Select
          value={filters.status}
          label="Status"
          onChange={(e) => handleFilterChange("status", e.target.value)}
          sx={selectStyles}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "background.paper",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
              }
            }
          }}
        >
          <MenuItem value="all" sx={menuItemStyles}>All</MenuItem>
          <MenuItem value="active" sx={menuItemStyles}>Active</MenuItem>
          <MenuItem value="scheduled" sx={menuItemStyles}>Scheduled</MenuItem>
          <MenuItem value="complete" sx={menuItemStyles}>Complete</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel 
          sx={{ 
            color: "white",
            "&.Mui-focused": {
              color: "white",
            }
          }}
        >
          Sort By
        </InputLabel>
        <Select
          value={filters.sort}
          label="Sort By"
          onChange={(e) => handleFilterChange("sort", e.target.value)}
          sx={selectStyles}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "background.paper",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
              }
            }
          }}
        >
          <MenuItem value="id" sx={menuItemStyles}>ID</MenuItem>
          <MenuItem value="title" sx={menuItemStyles}>Title</MenuItem>
          <MenuItem value="startTime" sx={menuItemStyles}>Start Time</MenuItem>
          <MenuItem value="endTime" sx={menuItemStyles}>End Time</MenuItem>
          <MenuItem value="owner" sx={menuItemStyles}>Owner</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;