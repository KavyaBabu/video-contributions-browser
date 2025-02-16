import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import { Search, Menu as MenuIcon } from "@mui/icons-material";
import Filters from "./Filters";

interface LayoutProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filters: { status: string; sort: string };
  setFilters: (value: any) => void;
}

const Layout: React.FC<LayoutProps> = ({ searchTerm, setSearchTerm, filters, setFilters }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="sticky" color="primary" sx={{ bgcolor: "#1e293b" }}>
      <Toolbar sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 2, py: 2 }}>
        {isMobile && (
          <IconButton color="inherit" sx={{ alignSelf: "flex-start" }}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" sx={{ fontWeight: 700, flexShrink: 0, color: "white" }}>
          News Contributions
        </Typography>

        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", width: isMobile ? "100%" : "auto" }}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth={isMobile}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search fontSize="small" sx={{ mr: 1, color: "white" }} />,
            }}
            sx={{
              minWidth: 240,
              bgcolor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 1,
              input: { color: "white" },
            }}
          />
        </Box>

        <Filters filters={filters} setFilters={setFilters} />
      </Toolbar>
    </AppBar>
  );
};

export default Layout;
