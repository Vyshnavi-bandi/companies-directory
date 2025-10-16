import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link,
  Chip,
  Box
} from '@mui/material'

export default function CompanyTable({ companies }) {
  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer 
        component={Paper} 
        elevation={1}
        sx={{ 
          borderRadius: 2,
          overflow: 'hidden',
          minWidth: 650, // ensures table width for scrolling
        }}
      >
        <Table aria-label="companies table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                Company
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                Industry
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                Location
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                Employees
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                Website
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow 
                key={company.id} 
                hover
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                <TableCell>
                  <Box>
                    <Typography 
                      variant="subtitle1" 
                      fontWeight={500}
                      sx={{ mb: 0.5 }}
                    >
                      {company.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        lineHeight: 1.4,
                        maxWidth: 300,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {company.description}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={company.industry} 
                    size="small" 
                    variant="outlined"
                    color="primary"
                    sx={{ fontSize: '0.75rem' }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {company.location}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {company.employees}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Link 
                    href={company.website} 
                    target="_blank" 
                    rel="noreferrer"
                    underline="hover"
                    sx={{ 
                      fontWeight: 500,
                      color: 'primary.main',
                      fontSize: '0.75rem',
                      '&:hover': { color: 'primary.dark' }
                    }}
                  >
                    Visit Website
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
