import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { NextPage } from 'next'
import NextLink from 'next/link'
import Head from 'next/head'
import { Layout as DashboardLayout } from '@/layouts/dashboard'
import { Scrollbar } from '@/components/scrollbar'
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'
import { useRouter } from 'next/router'
import { clients } from '@/utils/constants'
const Page: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Dashboard: お部屋管理</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={4}>
            <Stack spacing={1}>
              <div></div>
              <Stack
                alignItems='center'
                direction={{
                  xs: 'row',
                  md: 'row',
                }}
                justifyContent='space-between'
                spacing={1}
              >
                <Typography variant='h4'>取引先一覧</Typography>
                <div>
                  <Button variant='contained' component={NextLink} href={`/client/register`}>
                    取引先登録
                  </Button>
                </div>
              </Stack>
            </Stack>
            <Card>
              <Box sx={{ position: 'relative' }}>
                <Scrollbar>
                  <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>名前</TableCell>
                        <TableCell>会員数</TableCell>
                        <TableCell align='right'>詳細</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {clients.map((client) => {
                        return (
                          <TableRow
                            hover
                            key={client.id}
                            onClick={() => router.push(`/client/${client.id}`)}
                          >
                            <TableCell>{client.name}</TableCell>
                            <TableCell>{client.userCount}</TableCell>
                            <TableCell align='right'>
                              <IconButton component={NextLink} href={`/client/${client.id}`}>
                                <SvgIcon>
                                  <ArrowRightIcon />
                                </SvgIcon>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </Scrollbar>
              </Box>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
