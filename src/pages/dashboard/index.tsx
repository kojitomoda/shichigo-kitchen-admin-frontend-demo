import type { NextPage } from 'next'
import Head from 'next/head'
import { addDays, subDays, subHours, subMinutes } from 'date-fns'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {
  Box,
  Button,
  Container,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { usePageView } from '../../hooks/use-page-view'
import { useSettings } from '../../hooks/use-settings'
import { Layout as DashboardLayout } from '../../layouts/dashboard'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'
import { useRouter } from 'next/navigation'

const Page: NextPage = () => {
  const router = useRouter()
  const settings = useSettings()

  const trashs = [
    {
      id: 1,
      name: 'パークホームズ柏たなか',
      week: '月、木',
    },
    {
      id: 2,
      name: '幕張ベイパーク',
      week: '火、金',
    },
    {
      id: 3,
      name: 'パークホームズ昭島中神',
      week: '土',
    },
    {
      id: 4,
      name: 'ザ・ガーデンズ稲毛海岸',
      week: '日',
    },
    {
      id: 4,
      name: 'パークタワー西新宿',
      week: '日',
    },
    {
      id: 4,
      name: '三田ガーデンヒルズ',
      week: '日',
    },
    {
      id: 4,
      name: 'パークシティ高田馬場',
      week: '日',
    },
  ]

  usePageView()

  return (
    <>
      <Head>
        <title>Dashboard: Overview | シチゴウキッチン | 運営画面デモ</title>
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
                  <Box sx={{ position: 'relative' }}>
                    <Stack
                      alignItems='center'
                      direction='row'
                      flexWrap='wrap'
                      spacing={3}
                      sx={{ p: 3 }}
                    >
                      <Box component='form' sx={{ flexGrow: 1 }}>
                        <OutlinedInput
                          defaultValue=''
                          fullWidth
                          placeholder='建物名を入力ください'
                          startAdornment={<InputAdornment position='start'></InputAdornment>}
                        />
                      </Box>
                      <Button
                        startIcon={
                          <SvgIcon>
                            <SearchMdIcon />
                          </SvgIcon>
                        }
                        variant='contained'
                      >
                        検索
                      </Button>
                    </Stack>
                    <Table sx={{ minWidth: 500 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>名前</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {trashs.map((trash) => {
                          return (
                            <TableRow
                              hover
                              key={trash.id}
                              onClick={() => router.push('dashboard/customers')}
                            >
                              <TableCell>{trash.name}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </Box>
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
