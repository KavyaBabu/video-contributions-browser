import React, { useState } from "react";
import { ThemeProvider, Box, Grid, CircularProgress, Pagination, Typography } from "@mui/material";
import { theme } from "./theme";
import ContributionCard from "./components/ContributionCard";
import { useFetchContributions } from "./hooks/useFetchContributions";
import Layout from "./components/Layout";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ status: "all", sort: "title" });

  const { contributions, loading, totalPages } = useFetchContributions(searchTerm, page, filters);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f4f6f8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "90%" }}>
          <Layout
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
          />
        </Box>

        <Box sx={{ width: "100%", maxWidth: "90%", flexGrow: 1, py: 4 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : contributions.length === 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No contributions found
              </Typography>
            </Box>
          ) : (
            <Grid 
              container 
              spacing={3} 
              sx={{ 
                width: "100%",
                margin: 0,
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)"
                },
                gap: 3,
                "& > .MuiGrid-item": {
                  padding: 0,
                  width: "100%",
                  margin: 0,
                }
              }}
            >
              {contributions.map((contribution) => (
                <Grid item key={contribution.id}>
                  <ContributionCard contribution={contribution} />
                </Grid>
              ))}
            </Grid>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={(_, value) => setPage(value)}
              sx={{ my: 4 }}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
