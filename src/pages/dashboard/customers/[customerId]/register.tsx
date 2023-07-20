import type { NextPage } from 'next'
import NextLink from 'next/link'
import Head from 'next/head'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Link,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { Layout as DashboardLayout } from '../../../../layouts/dashboard'
import { PropertyList } from '@/components/property-list'

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard: Customer Details | シチゴウキッチン | 運営画面デモ</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 1,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={4} style={{ marginBottom: '30px' }}>
            <Stack spacing={4}>
              <div>
                <Link
                  color='text.primary'
                  component={NextLink}
                  href={'/dashboard/customers'}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex',
                    marginRight: '20px',
                  }}
                  underline={'always'}
                >
                  &gt; 部屋一覧
                </Link>
                <Link
                  color='text.primary'
                  component={NextLink}
                  href={'/dashboard/customers/:customerId/'}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex',
                    marginRight: '20px',
                  }}
                  underline={'always'}
                >
                  &gt; 1201
                </Link>
                <span style={{ marginLeft: '5px' }}>&gt; 入居者登録</span>
              </div>
              <Stack
                alignItems='flex-start'
                direction={{
                  xs: 'column',
                  md: 'row',
                }}
                justifyContent='space-between'
                spacing={4}
              >
                <Stack>
                  <Stack
                    alignItems='center'
                    direction={{
                      xs: 'row',
                      md: 'row',
                    }}
                    spacing={3}
                  >
                    <Typography variant='h4'>入居者登録</Typography>
                  </Stack>
                </Stack>

                <Stack alignItems='center' direction='row' spacing={2}></Stack>
              </Stack>
              <div>
                <Divider />
              </div>
            </Stack>
            <div>
              <Grid container style={{ justifyContent: 'center' }}>
                <Grid xs={12} lg={8}>
                  <Card>
                    <div style={{ padding: '20px' }}>
                      <PropertyList>
                        <TextField
                          fullWidth
                          label='入居予定日'
                          name='a'
                          value={'2022/03/01'}
                          style={{ marginBottom: '30px' }}
                        />
                      </PropertyList>
                      <Typography color='text.secondary' variant='body2'>
                        ※ 退去日以降の日付で登録ください。
                      </Typography>
                      <Stack
                        alignItems='center'
                        direction={{
                          xs: 'row',
                          md: 'row',
                        }}
                        justifyContent='end'
                        spacing={1}
                      >
                        <div>
                          <Button variant='contained' color={'info'}>
                            登録する
                          </Button>
                        </div>
                      </Stack>
                    </div>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Stack>
          <div style={{ marginBottom: '20px' }}>
            <Divider />
          </div>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
