import type { NextPage } from '../../../next'
import NextLink from 'next/link'
import Head from 'next/head'
import { Box, Breadcrumbs, Container, Link, Stack, Typography } from '@mui/material'
import { BreadcrumbsSeparator } from '../../components/breadcrumbs-separator'
import { usePageView } from '../../hooks/use-page-view'
import { Layout as DashboardLayout } from '../../layouts/dashboard'
import { ProductCreateForm } from '../../sections/dashboard/product/product-create-form'
import { CreateForm } from '@/sections/dashboard/system-setting/create-form'

const ProductCreate: NextPage = () => {
  usePageView()

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
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant='h4'>システム設定</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Typography color='text.secondary' variant='subtitle2'></Typography>
              </Breadcrumbs>
            </Stack>
            <CreateForm />
          </Stack>
        </Container>
      </Box>
    </>
  )
}

ProductCreate.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default ProductCreate
