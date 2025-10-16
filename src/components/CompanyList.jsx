import React from "react";
import { useCompanies } from "../context/CompanyContext";
import CompanyCard from "./CompanyCard";
import CompanyTable from "./CompanyTable";
import Pagination from "./Pagination";
import {
  Grid,
  Alert,
  CircularProgress,
  Box,
  Typography
} from '@mui/material';

export default function CompanyList() {
  const {
    paginatedResults,
    loading,
    error,
    viewMode,
    totalItems
  } = useCompanies();

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        gap: 2
      }}>
        <CircularProgress size={40} />
        <Typography variant="body2" color="text.secondary">
          Loading companies...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{
          mb: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="body2">
          Error: {error}
        </Typography>
      </Alert>
    );
  }

  if (totalItems === 0) {
    return (
      <Alert
        severity="info"
        sx={{
          mb: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="body2">
          No companies found matching your criteria.
        </Typography>
      </Alert>
    );
  }

  return (
    <Box>
      {viewMode === 'card' ? (
        <Box sx={{ mb: 3 }}>
  <Grid container spacing={3}>
  {paginatedResults.map((c) => (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}
      item
      xs={12}     // 1 per row on mobile
      sm={6}      // 2 per row on tablet
      md={4}      // 3 per row on desktop
      key={c.id}
        // ✅ Make each column a flexbox
    >
      <CompanyCard company={c} style={{ width:'100%', height:'100%' }} />  
    </Grid>
  ))}
</Grid>




        </Box>
      ) : (
        <Box sx={{ mb: 3 }}>
          <CompanyTable companies={paginatedResults} />
        </Box>
      )}

      <Pagination />
    </Box>
  );
}
