import type { NextPage } from 'next'
import Head from 'next/head'
import { addDays, subDays, subHours, subMinutes } from 'date-fns'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { usePageView } from '../../hooks/use-page-view'
import { useSettings } from '../../hooks/use-settings'
import { Layout as DashboardLayout } from '../../layouts/dashboard'
import { HomeListTable } from '@/sections/dashboard/home/home-list-table'
const now = new Date()

const Page: NextPage = () => {
  const settings = useSettings()

  usePageView()

  return (
    <>
      <Head>
        <title>Dashboard: Overview | Devias Kit PRO</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack direction='row' justifyContent='space-between' spacing={4}>
                <div>
                  <Typography variant='h4'>建物を選択してください</Typography>
                </div>
              </Stack>
              <Stack direction='row' justifyContent='space-between' spacing={4}>
                <div style={{ marginTop: '40px' }}>
                  <HomeListTable />
                </div>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
