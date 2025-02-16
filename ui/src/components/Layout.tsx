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
  setPage: (value: any) => void;
}

const Layout: React.FC<LayoutProps> = ({ searchTerm, setSearchTerm, filters, setFilters, setPage }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <AppBar position="fixed" color="primary" sx={{ bgcolor: "#1e293b", zIndex: 1100 }}>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
            py: 2,
            alignItems: "center",
          }}
        >
          {isMobile && (
            <IconButton color="inherit" sx={{ alignSelf: "flex-start" }}>
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ fontWeight: 700, flexShrink: 0, color: "white" }}>
            Video Contributions
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", width: "100%" }}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth={isMobile}
              placeholder="Find contributions by title, description, or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search fontSize="small" sx={{ mr: 1, color: "white" }} />,
                sx: { color: "white" },
              }}
              sx={{
                minWidth: isMobile ? "100%" : "450px",
                bgcolor: "rgba(255, 255, 255, 0.15)",
                borderRadius: 1,
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
              }}
            />
          </Box>


          <Box sx={{ display: "flex", alignItems: "center", color: "white", flexDirection: isMobile ? "column" : "row" }}>
            <Filters filters={filters} setFilters={setFilters} setPage={setPage}/>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: isMobile ? 32 : 16 }} />
    </>
  );
};

export default Layout;
