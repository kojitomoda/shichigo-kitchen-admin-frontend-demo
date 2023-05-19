import type { NextPage } from 'next'
import NextLink from 'next/link'
import Head from 'next/head'
import { Box, Breadcrumbs, Container, Link, Stack, Typography } from '@mui/material'
import { BreadcrumbsSeparator } from '../../../components/breadcrumbs-separator'
import { usePageView } from '../../../hooks/use-page-view'
import { Layout as DashboardLayout } from '../../../layouts/dashboard'
import { paths } from '../../../paths'
import { ProductCreateForm } from '../../../sections/dashboard/product/product-create-form'

const ProductCreate: NextPage = () => {
  usePageView()

  return (
    <>
      <Head>
        <title>Dashboard: Product Create | Devias Kit PRO</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant='h4'>三田ガーデンヒルズ</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Typography color='text.secondary' variant='subtitle2'></Typography>
              </Breadcrumbs>
            </Stack>
            <ProductCreateForm />
          </Stack>
        </Container>
      </Box>
    </>
  )
}

ProductCreate.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default ProductCreate
