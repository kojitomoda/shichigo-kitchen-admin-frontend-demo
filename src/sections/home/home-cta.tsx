import type { FC } from 'react'
import { Box, Button, Container, Stack, Typography } from '@mui/material'

export const HomeCta: FC = () => (
  <Box
    sx={{
      backgroundColor: 'neutral.800',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
      backgroundImage: 'url("/assets/gradient-bg.svg")',
      color: 'neutral.100',
      py: '120px',
    }}
  >
    <Container maxWidth='lg'></Container>
  </Box>
)
