import React from 'react'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  Box, 
  Chip,
  Link,
  Divider
} from '@mui/material'

export default function CompanyCard({ company }) {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'box-shadow 0.2s ease-in-out',
        width: '100%',
        minHeight: '100%',
      }}
    >
      <CardHeader
        title={
          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ 
              fontWeight: 500,
              color: 'text.primary',
              lineHeight: 1.3,
            }}
          >
            {company.name}
          </Typography>
        }
        subheader={
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
            <Chip 
              label={company.industry} 
              size="small" 
              variant="outlined"
              color="primary"
              sx={{ fontSize: '0.75rem' }}
            />
            <Chip 
              label={company.location} 
              size="small" 
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          </Box>
        }
        sx={{ pb: 1 }}
      />
      
      <CardContent sx={{ flexGrow: 1, pt: 0 }}>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 3, 
            minHeight: '3em',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {company.description}
        </Typography>
        
        <Divider sx={{ mb: 2 }} />
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
        }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {company.employees} employees
          </Typography>
          <Link 
            href={company.website} 
            target="_blank" 
            rel="noreferrer"
            underline="hover"
            sx={{ 
              fontWeight: 500,
              color: 'primary.main',
              fontSize: '0.75rem',
              '&:hover': {
                color: 'primary.dark',
              }
            }}
          >
            Visit Website
          </Link>
        </Box>
      </CardContent>
    </Card>
  )
}