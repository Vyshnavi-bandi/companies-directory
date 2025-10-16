import React from 'react'
import {
  Box,
  Pagination as MuiPagination,
  FormControl,
 
  Select,
  MenuItem,
  Typography
} from '@mui/material'
import { useCompanies } from '../context/CompanyContext'

export default function Pagination() {
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    handlePageChange,
    handleItemsPerPageChange,
  } = useCompanies()

  if (totalItems === 0) {
    return null
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 2,
      py: 2,
    }}>
      <Typography variant="body2" color="text.secondary">
        Showing {startItem}-{endItem} of {totalItems}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <FormControl size="small" sx={{ minWidth: 70 }}>
          <Select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            variant="outlined"
            sx={{ fontSize: '0.875rem' }}
          >
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={48}>48</MenuItem>
          </Select>
        </FormControl>

        <MuiPagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="small"
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: '0.875rem',
            },
          }}
        />
      </Box>
    </Box>
  )
}
