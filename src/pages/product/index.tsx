import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react'
import type { NextPage } from '../../../next'
import Head from 'next/head'
import NextLink from 'next/link'
import { Box, Button, Card, Container, Stack, SvgIcon, Tab, Tabs, Typography } from '@mui/material'

import { Layout as DashboardLayout } from '../../layouts/dashboard'
import { ProductListTable } from '../../sections/dashboard/product/product-list-table'
import type { Product } from '../../types/product'
import { data } from '@/api/products/data'

interface Filters {
  name?: string
  category: string[]
  status: string[]
  inStock?: boolean
}

interface Search {
  filters: Filters
  page: number
  rowsPerPage: number
}

interface TabOption {
  label: string
  value: string
}

const tabOptions: TabOption[] = [
  {
    label: '定番メニュー',
    value: 'constant',
  },
  {
    label: '日替わりメニュー',
    value: 'change',
  },
]

const useSearch = () => {
  const [search, setSearch] = useState<Search>({
    filters: {
      name: undefined,
      category: [],
      status: [],
      inStock: undefined,
    },
    page: 0,
    rowsPerPage: 5,
  })

  return {
    search,
    updateSearch: setSearch,
  }
}

const ProductList: NextPage = () => {
  const { search, updateSearch } = useSearch()
  const [products, setProducts] = useState<Product[]>(data)
  const [currentTab, setCurrentTab] = useState('constant')

  const handleTabsChange = useCallback((event: ChangeEvent<{}>, tab: string): void => {
    setCurrentTab(tab)
  }, [])

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      updateSearch((prevState) => ({
        ...prevState,
        page,
      }))
    },
    [updateSearch],
  )

  const handleRowsPerPageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      updateSearch((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
      }))
    },
    [updateSearch],
  )

  useEffect(() => {
    const newProducts = data.filter((product) => product.category === currentTab)
    setProducts(newProducts)
  }, [currentTab])

  return (
    <>
      <Head>
        <title>Dashboard: Product List | Devias Kit PRO</title>
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
                <Typography variant='h4'>商品一覧</Typography>
              </Stack>
              <Stack alignItems='center' direction='row' spacing={3}>
                <Button component={NextLink} href={'/product/register'} variant='contained'>
                  商品登録
                </Button>
              </Stack>
            </Stack>

            <Card>
              <Tabs
                indicatorColor='primary'
                onChange={handleTabsChange}
                scrollButtons='auto'
                sx={{ px: 3 }}
                textColor='primary'
                value={currentTab}
                variant='scrollable'
              >
                {tabOptions.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </Tabs>
              <ProductListTable
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={search.page}
                products={products}
                productsCount={4}
                rowsPerPage={search.rowsPerPage}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

ProductList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default ProductList
