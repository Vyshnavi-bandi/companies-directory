import React from 'react'
import { 
  Box, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button,
  IconButton,
  Tooltip,
  Paper,
  Typography,
  Divider
} from '@mui/material'
import { ViewList, ViewModule, Search, FilterList } from '@mui/icons-material'
import { useCompanies } from '../context/CompanyContext'

export default function Filters() {
  const { 
    search, 
    setSearch, 
    industry, 
    setIndustry, 
    location, 
    setLocation, 
    industries, 
    locations, 
    viewMode, 
    setViewMode 
  } = useCompanies()

  return (
    <Paper 
      elevation={1}
      sx={{ 
        p: 3,
        mb: 3,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <FilterList color="primary" fontSize="small" />
        <Typography variant="h6" fontWeight={500} color="text.primary">
          Search & Filters
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 2, 
          flexWrap: 'wrap', 
          alignItems: 'center',
        }}
      >
        <TextField
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search companies, industry, location..."
          variant="outlined"
          size="small"
          sx={{ 
            minWidth: 200, 
            flex: 1,
          }}
          InputProps={{
            startAdornment: <Search color="action" sx={{ mr: 1, fontSize: '1.2rem' }} />,
          }}
        />

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Industry</InputLabel>
          <Select
            value={industry}
            onChange={e => setIndustry(e.target.value)}
            label="Industry"
          >
            {industries.map((i) => (
              <MenuItem value={i} key={i}>{i}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Location</InputLabel>
          <Select
            value={location}
            onChange={e => setLocation(e.target.value)}
            label="Location"
          >
            {locations.map((l) => (
              <MenuItem value={l} key={l}>{l}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button 
          onClick={() => { 
            setSearch(''); 
            setIndustry('All'); 
            setLocation('All') 
          }} 
          variant="outlined"
          size="small"
          sx={{ minWidth: 80 }}
        >
          Clear
        </Button>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            View:
          </Typography>
          <Tooltip title={`Switch to ${viewMode === 'card' ? 'table' : 'card'} view`}>
            <IconButton 
              onClick={() => setViewMode(viewMode === 'card' ? 'table' : 'card')}
              sx={{
                bgcolor: viewMode === 'card' ? 'primary.main' : 'transparent',
                color: viewMode === 'card' ? 'white' : 'primary.main',
                border: '1px solid',
                borderColor: 'primary.main',
                '&:hover': {
                  bgcolor: viewMode === 'card' ? 'primary.dark' : 'action.hover',
                },
              }}
            >
              {viewMode === 'card' ? <ViewList /> : <ViewModule />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  )
}