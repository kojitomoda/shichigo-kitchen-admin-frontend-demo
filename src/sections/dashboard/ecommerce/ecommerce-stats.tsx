import type { FC } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import numeral from 'numeral'

interface EcommerceStatsProps {
  cost: number
  profit: number
  sales: number
}

export const EcommerceStats: FC<EcommerceStatsProps> = (props) => {
  const { cost, profit, sales } = props

  const formattedCost = numeral(cost).format('$0.[0]a')
  const formattedProfit = numeral(profit).format('$0.[0]a')
  const formattedSales = numeral(sales).format('$0.[0]a')

  return (
    <Card>
      <CardHeader title='本日の売上' sx={{ pb: 0 }} />
      <CardContent>
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Stack
              alignItems='center'
              direction='row'
              spacing={2}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'neutral.800' : 'error.lightest',
                borderRadius: 2.5,
                px: 3,
                py: 4,
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  height: 32,
                  width: 32,
                  '& img': {
                    width: '100%',
                  },
                }}
              >
                <img src='/assets/iconly/iconly-glass-chart.svg' />
              </Box>
              <div>
                <Typography color='text.secondary' variant='body2'>
                  売上
                </Typography>
                <Typography variant='h5'>85,800円</Typography>
              </div>
            </Stack>
          </Grid>
          <Grid xs={12} md={4}>
            <Stack
              alignItems='center'
              direction='row'
              spacing={2}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'neutral.800' : 'warning.lightest',
                borderRadius: 2.5,
                px: 3,
                py: 4,
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  height: 48,
                  width: 48,
                  '& img': {
                    width: '100%',
                  },
                }}
              >
                <img src='/assets/iconly/iconly-glass-discount.svg' />
              </Box>
              <div>
                <Typography color='text.secondary' variant='body2'>
                  個数
                </Typography>
                <Typography variant='h5'>230個</Typography>
              </div>
            </Stack>
          </Grid>
          <Grid xs={12} md={4}>
            <Stack
              alignItems='center'
              direction='row'
              spacing={2}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'neutral.800' : 'success.lightest',
                borderRadius: 2.5,
                px: 3,
                py: 4,
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  height: 48,
                  width: 48,
                  '& img': {
                    width: '100%',
                  },
                }}
              >
                <img src='/assets/iconly/iconly-glass-tick.svg' />
              </Box>
              <div>
                <Typography color='text.secondary' variant='body2'>
                  客単価
                </Typography>
                <Typography variant='h5'>740円</Typography>
              </div>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
