import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react'
import type { NextPage } from '../../../next'
import Head from 'next/head'
import NextLink from 'next/link'
import { Box, Button, Card, Container, Stack, SvgIcon, Typography } from '@mui/material'
import { productsApi } from '../../api/products'
import { useMounted } from '../../hooks/use-mounted'
import { usePageView } from '../../hooks/use-page-view'
import { Layout as DashboardLayout } from '../../layouts/dashboard'
import { ProductListTable } from '../../sections/dashboard/product/product-list-table'
import type { Product } from '../../types/product'

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

const useProducts = (search: Search): { products: Product[]; productsCount: number } => {
  const isMounted = useMounted()
  const [state, setState] = useState<{
    products: Product[]
    productsCount: number
  }>({
    products: [],
    productsCount: 0,
  })

  const getProducts = useCallback(async () => {
    try {
      const response = await productsApi.getProducts(search)

      if (isMounted()) {
        setState({
          products: response.data,
          productsCount: response.count,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }, [search, isMounted])

  useEffect(
    () => {
      getProducts()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search],
  )

  return state
}

const ProductList: NextPage = () => {
  const { search, updateSearch } = useSearch()
  const { products, productsCount } = useProducts(search)

  usePageView()

  const handleFiltersChange = useCallback(
    (filters: Filters): void => {
      updateSearch((prevState) => ({
        ...prevState,
        filters,
      }))
    },
    [updateSearch],
  )

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

  return (
    <>
      <Head>
        <title>Dashboard: Product List | Devias Kit PRO</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
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
              <ProductListTable
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={search.page}
                products={products}
                productsCount={productsCount}
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
