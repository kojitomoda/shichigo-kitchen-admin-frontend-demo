import type { NextPage } from 'next'
import Head from 'next/head'
import RefreshCcw01Icon from '@untitled-ui/icons-react/build/esm/RefreshCcw01'
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
import { EcommerceCostBreakdown } from '../../sections/dashboard/ecommerce/ecommerce-cost-breakdown'
import { EcommerceSalesByCountry } from '../../sections/dashboard/ecommerce/ecommerce-sales-by-country'
import { EcommerceSalesRevenue } from '../../sections/dashboard/ecommerce/ecommerce-sales-revenue'
import { EcommerceProducts } from '../../sections/dashboard/ecommerce/ecommerce-products'
import { EcommerceStats } from '../../sections/dashboard/ecommerce/ecommerce-stats'

const Page: NextPage = () => {
  const settings = useSettings()

  usePageView()

  return (
    <>
      <Head>
        <title>Dashboard: E-Commerce | Devias Kit PRO</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack direction='row' justifyContent='space-between' spacing={4}>
                <div>
                  <Typography variant='h4'>売上分析</Typography>
                </div>
                <Stack alignItems='center' direction='row' spacing={2}></Stack>
              </Stack>
            </Grid>
            <Grid xs={12} lg={8}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                <EcommerceStats cost={99700} profit={32100} sales={152000} />
                <EcommerceSalesRevenue
                  chartSeries={[
                    {
                      name: '今月',
                      data: [
                        3350, 1840, 2254, 5780, 9349, 5241, 2770, 2051, 3764, 2385, 5912, 8323,
                      ],
                    },
                    {
                      name: '先月',
                      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
                    },
                  ]}
                />
                <EcommerceSalesByCountry
                  sales={[
                    {
                      id: 'us',
                      amount: 46,
                      country: '東京エレクトロン宮城',
                    },
                    {
                      id: 'es',
                      amount: 34,
                      country: 'アイリスオーヤマ',
                    },
                    {
                      id: 'uk',
                      amount: 10,
                      country: 'キタセキ',
                    },
                    {
                      id: 'de',
                      amount: 5,
                      country: 'トヨタ自動車東日本',
                    },
                    {
                      id: 'ca',
                      amount: 5,
                      country: 'アイリスプラザ',
                    },
                  ]}
                />
              </Stack>
            </Grid>
            <Grid xs={12} lg={4}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                <EcommerceProducts
                  products={[
                    {
                      id: '5eff2524ef813f061b3ea39f',
                      category: 'Accessories',
                      image: '/assets/products/product-5.jpeg',
                      name: 'ランチボックス',
                      sales: 12400,
                    },
                    {
                      id: '5eff2512c6f8737d08325676',
                      category: 'おにぎり',
                      image: '/assets/products/product-1.jpeg',
                      name: 'おにぎり・塩',
                      sales: 11000,
                    },
                    {
                      id: '5eff2516247f9a6fcca9f151',
                      category: 'Accessories',
                      image: '/assets/products/product-2.jpeg',
                      name: 'おにぎり・銀鮭',
                      sales: 8400,
                    },
                    {
                      id: '5eff251a3bb9ab7290640f18',
                      category: 'Accessories',
                      image: '/assets/products/product-3.jpeg',
                      name: '唐揚げ・塩',
                      sales: 6200,
                    },
                    {
                      id: '5eff251e297fd17f0dc18a8b',
                      category: 'Accessories',
                      image: '/assets/products/product-4.jpeg',
                      name: '唐揚げ・甘ダレ',
                      sales: 5800,
                    },
                  ]}
                />
                <EcommerceCostBreakdown
                  chartSeries={[46000, 50000, 12000, 8000]}
                  labels={['おにぎり', 'ランチボックス', '唐揚げ', '豚汁']}
                />
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
