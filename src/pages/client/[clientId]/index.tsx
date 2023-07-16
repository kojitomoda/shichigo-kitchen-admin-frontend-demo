import {
  Box,
  Card,
  Container,
  Link,
  Stack,
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

const users = [
  {
    id: 1,
    name: '友田 晃司',
  },
  {
    id: 2,
    name: '田中 陽子',
  },
  {
    id: 3,
    name: '山田 健太郎',
  },
  {
    id: 4,
    name: '佐藤 美香子 ',
  },
  {
    id: 5,
    name: '鈴木 太一 ',
  },
  {
    id: 6,
    name: '高橋 さやか',
  },
  {
    id: 7,
    name: '伊藤 裕太',
  },
  {
    id: 8,
    name: '渡辺 由美子',
  },
  {
    id: 9,
    name: '中村 光男',
  },
  {
    id: 10,
    name: '小林 あかり',
  },
  {
    id: 11,
    name: '加藤 拓也',
  },
]
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
              <div>
                <Link
                  color='text.primary'
                  component={NextLink}
                  href={'/client'}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex',
                    marginRight: '10px',
                  }}
                  underline={'always'}
                >
                  &gt; 取引先一覧
                </Link>
                <span style={{ marginLeft: '5px' }}>&gt; {'アイリスオーヤマ'}</span>
              </div>
              <Stack
                alignItems='center'
                direction={{
                  xs: 'row',
                  md: 'row',
                }}
                justifyContent='space-between'
                spacing={1}
                style={{ marginBottom: '20px' }}
              >
                <Typography variant='h4'>会員一覧</Typography>
                <div></div>
              </Stack>
            </Stack>
          </Stack>
          <Card>
            <Box sx={{ position: 'relative' }}>
              <Scrollbar>
                <Table sx={{ minWidth: 700 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>NO</TableCell>
                      <TableCell>名前</TableCell>
                      {/*<TableCell>その他</TableCell>*/}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => {
                      return (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          {/*<TableCell>{client.userCount}</TableCell>*/}
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Scrollbar>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
