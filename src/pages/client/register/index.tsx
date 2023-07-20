import type { NextPage } from 'next'
import Head from 'next/head'
import {
  Box,
  Card,
  Container,
  Stack,
  Typography,
  Button,
  CardContent,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { Layout as DashboardLayout } from '../../../layouts/dashboard'
import { prefectures } from '@/utils/constants'

export type InitialFormValue = {
  name: string
  email: string
  phoneNumber: string
  postalCode: string
  prefectureId: number
  city: string
  address: string
}

const ClientRegister: NextPage = () => {
  const initialValues: InitialFormValue = {
    name: '',
    email: '',
    postalCode: '',
    prefectureId: 4,
    city: '',
    address: '',
    phoneNumber: '',
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values, helpers) => {
      try {
        toast.success('クライアントを登録しました。', {
          position: 'top-right',
        })
        console.log('%cポストデータ', 'color: green')
      } catch (e) {
        toast.error('クライアントに失敗しました', {
          position: 'top-right',
        })
      }
    },
  })
  return (
    <>
      <Head>
        <title>Dashboard: Product Create | シチゴウキッチン | 運営画面デモ</title>
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
            <Stack direction='row' justifyContent='space-between' spacing={4}>
              <Stack spacing={1}>
                <Typography variant='h4'>取引先登録</Typography>
                <Stack alignItems='center' direction='row' spacing={1}></Stack>
              </Stack>
            </Stack>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={4}>
                <Card>
                  <CardContent>
                    <Grid container alignItems='center' justifyContent='center'>
                      <Grid item xs={12} sm={6} md={6}>
                        <Stack spacing={3} sx={{ marginBottom: '4rem' }}>
                          <TextField
                            fullWidth
                            label='会社名'
                            name='name'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                          />
                          <TextField
                            fullWidth
                            label='電話番号'
                            name='phoneNumber'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.phoneNumber}
                          />
                          <TextField
                            fullWidth
                            label='郵便番号　ハイフンなし'
                            name='postalCode'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.postalCode}
                          />
                          {prefectures && (
                            <TextField
                              onChange={formik.handleChange}
                              label='都道府県'
                              name='prefectureId'
                              select
                              fullWidth
                              value={formik.values.prefectureId}
                            >
                              {prefectures.map((prefecture) => (
                                <MenuItem key={prefecture.id} value={prefecture.id}>
                                  {prefecture.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          )}
                          <TextField
                            fullWidth
                            label='市町村'
                            name='city'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.city}
                          />
                          <TextField
                            fullWidth
                            label='番地以下'
                            name='address'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.address}
                          />
                        </Stack>
                        <Stack alignItems='center' justifyContent='center' spacing={3}>
                          <Button type='submit' variant='contained' fullWidth>
                            登録する
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Stack>
            </form>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

ClientRegister.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default ClientRegister
