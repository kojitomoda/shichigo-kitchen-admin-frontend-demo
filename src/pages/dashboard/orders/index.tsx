import type { ChangeEvent, MouseEvent } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import { Box, Button, Divider, Stack, SvgIcon, Typography } from '@mui/material'
import { ordersApi } from '../../../api/orders'
import { useMounted } from '../../../hooks/use-mounted'
import { usePageView } from '../../../hooks/use-page-view'
import { Layout as DashboardLayout } from '../../../layouts/dashboard'
import { OrderDrawer } from '../../../sections/dashboard/order/order-drawer'
import { OrderListContainer } from '../../../sections/dashboard/order/order-list-container'
import { OrderListSearch } from '../../../sections/dashboard/order/order-list-search'
import { OrderListTable } from '../../../sections/dashboard/order/order-list-table'
import type { Order } from '../../../types/order'
import { OrderListTable2 } from '@/sections/dashboard/order/order-list-table-2'
import { Customer } from '@/types/customer'
import { customersApi } from '@/api/customers'
import { subDays, subHours } from 'date-fns'

interface Filters {
  query?: string
  status?: string
}

type SortDir = 'asc' | 'desc'

interface Search {
  filters: Filters
  page: number
  rowsPerPage: number
  sortBy?: string
  sortDir?: SortDir
}

const useSearch = () => {
  const [search, setSearch] = useState<Search>({
    filters: {
      query: undefined,
      status: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: 'createdAt',
    sortDir: 'desc',
  })

  return {
    search,
    updateSearch: setSearch,
  }
}

const useCustomers = (search: Search): { customers: Customer[]; customersCount: number } => {
  const isMounted = useMounted()
  const [state, setState] = useState<{
    customers: Customer[]
    customersCount: number
  }>({
    customers: [],
    customersCount: 0,
  })
  const now = new Date()
  const customers: Customer[] = [
    {
      id: '5e887ac47eed253091be10cb',
      avatar: '/assets/avatars/avatar-carson-darrin.png',
      city: 'Cleveland',
      country: 'USA',
      currency: '$',
      email: 'carson.darrin@devias.io',
      hasAcceptedMarketing: true,
      isProspect: false,
      isReturning: true,
      name: '友田　晃司',
      state: 'Ohio',
      totalSpent: 300.0,
      totalOrders: 3,
      updatedAt: subDays(subHours(now, 7), 1).getTime(),
      loginDate: '2023/03/05 17:22:10',
      loginId: '234234532432',
      role: '管理者',
    },
    {
      id: '5e887b209c28ac3dd97f6db5',
      avatar: '/assets/avatars/avatar-fran-perez.png',
      city: 'Atlanta',
      country: 'USA',
      currency: '$',
      email: 'fran.perez@devias.io',
      hasAcceptedMarketing: true,
      isProspect: true,
      isReturning: false,
      name: 'Fran Perez',
      state: 'Georgia',
      totalSpent: 0.0,
      totalOrders: 0,
      updatedAt: subDays(subHours(now, 1), 2).getTime(),
      loginDate: '2023/03/05 17:22:10',
      loginId: '234234532432',
      role: '管理者',
    },
    {
      id: '5e887b7602bdbc4dbb234b27',
      avatar: '/assets/avatars/avatar-jie-yan-song.png',
      city: 'North Canton',
      country: 'USA',
      currency: '$',
      email: 'jie.yan.song@devias.io',
      hasAcceptedMarketing: false,
      isProspect: false,
      isReturning: false,
      name: '山田　太朗',
      state: 'Ohio',
      totalSpent: 5600.0,
      totalOrders: 6,
      updatedAt: subDays(subHours(now, 4), 2).getTime(),
      loginDate: '2023/03/05 17:22:10',
      loginId: '234234532432',
      role: '管理者',
    },
    {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      city: 'Madrid',
      country: 'Spain',
      currency: '$',
      email: 'anika.visser@devias.io',
      hasAcceptedMarketing: true,
      isProspect: false,
      isReturning: true,
      name: 'Anika Visser',
      state: 'Madrid',
      totalSpent: 500.0,
      totalOrders: 1,
      updatedAt: subDays(subHours(now, 11), 2).getTime(),
      loginDate: '2023/03/05 17:22:10',
      loginId: '234234532432',
      role: '議事録担当',
    },
    {
      id: '5e86805e2bafd54f66cc95c3',
      avatar: '/assets/avatars/avatar-miron-vitold.png',
      city: 'San Diego',
      country: 'USA',
      currency: '$',
      email: 'miron.vitold@devias.io',
      hasAcceptedMarketing: true,
      isProspect: true,
      isReturning: false,
      name: 'Miron Vitold',
      totalSpent: 0.0,
      totalOrders: 0,
      state: 'California',
      updatedAt: subDays(subHours(now, 7), 3).getTime(),
      loginDate: '2023/03/05 17:22:10',
      loginId: '234234532432',
      role: '議事録担当',
    },
    {
      id: '5e887a1fbefd7938eea9c981',
      avatar: '/assets/avatars/avatar-penjani-inyene.png',
      city: 'Berkeley',
      country: 'USA',
      currency: '$',
      email: 'penjani.inyene@devias.io',
      hasAcceptedMarketing: false,
      isProspect: true,
      isReturning: false,
      name: 'Penjani Inyene',
      state: 'California',
      totalSpent: 0.0,
      totalOrders: 0,
      updatedAt: subDays(subHours(now, 5), 4).getTime(),
      loginDate: '2023/03/05 17:22:10',
      loginId: '234234532432',
      role: '議事録担当',
    },
    {
      id: '5e887d0b3d090c1b8f162003',
      avatar: '/assets/avatars/avatar-omar-darboe.png',
      currency: '$',
      email: 'omar.darobe@devias.io',
      hasAcceptedMarketing: true,
      isProspect: false,
      isReturning: false,
      city: 'Carson City',
      country: 'USA',
      name: 'Omar Darobe',
      state: 'Nevada',
      totalSpent: 100.0,
      totalOrders: 4,
      updatedAt: subDays(subHours(now, 15), 4).getTime(),
      loginDate: '2023/03/05 17:22:10',
      loginId: '234234532432',
      role: '広告担当',
    },
    {
      id: '5e88792be2d4cfb4bf0971d9',
      avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
      city: 'Los Angeles',
      country: 'USA',
      currency: '$',
      email: 'siegbert.gottfried@devias.io',
      hasAcceptedMarketing: true,
      isProspect: false,
      isReturning: true,
      name: 'Siegbert Gottfried',
      state: 'California',
      totalSpent: 1000.0,
      totalOrders: 2,
      updatedAt: subDays(subHours(now, 2), 5).getTime(),
      loginDate: '2023/03/05 17:22:10',
      loginId: '234234532432',
      role: '広告担当',
    },
    {
      id: '5e8877da9a65442b11551975',
      avatar: '/assets/avatars/avatar-iulia-albu.png',
      city: 'Murray',
      country: 'USA',
      email: 'iulia.albu@devias.io',
      hasAcceptedMarketing: true,
      isProspect: true,
      isReturning: false,
      name: 'Iulia Albu',
      state: 'Utah',
      totalSpent: 0.0,
      totalOrders: 0,
      updatedAt: subDays(subHours(now, 8), 6).getTime(),
      loginDate: '2023/03/05 17:22:10',
      loginId: '234234532432',
      role: '広告担当',
    },
    {
      id: '5e8680e60cba5019c5ca6fda',
      avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
      city: 'Salt Lake City',
      country: 'USA',
      currency: '$',
      email: 'nasimiyu.danai@devias.io',
      hasAcceptedMarketing: false,
      isProspect: false,
      isReturning: true,
      name: 'Nasimiyu Danai',
      state: 'Utah',
      totalSpent: 200.0,
      totalOrders: 7,
      updatedAt: subDays(subHours(now, 1), 9).getTime(),
      loginDate: '2023/03/05 17:22:10',
      loginId: '234234532432',
      role: '広告担当',
    },
  ]

  const getCustomers = useCallback(async () => {
    try {
      if (isMounted()) {
        setState({
          customers: customers,
          customersCount: 10,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }, [search, isMounted])

  useEffect(
    () => {
      getCustomers()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search],
  )

  return state
}
const useOrders = (search: Search): { orders: Order[]; ordersCount: number } => {
  const isMounted = useMounted()
  const [state, setState] = useState<{
    orders: Order[]
    ordersCount: number
  }>({
    orders: [],
    ordersCount: 0,
  })

  const getOrders = useCallback(async () => {
    try {
      const response = await ordersApi.getOrders(search)

      if (isMounted()) {
        setState({
          orders: response.data,
          ordersCount: response.count,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }, [search, isMounted])

  useEffect(
    () => {
      getOrders()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search],
  )

  return state
}

const Page: NextPage = () => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const { search, updateSearch } = useSearch()
  const { orders, ordersCount } = useOrders(search)
  const { customers, customersCount } = useCustomers(search)
  const [drawer, setDrawer] = useState<{
    isOpen: boolean
    data?: string
  }>({
    isOpen: false,
    data: undefined,
  })
  const currentOrder = useMemo((): Order | undefined => {
    if (!drawer.data) {
      return undefined
    }

    return orders.find((order) => order.id === drawer.data)
  }, [drawer, orders])

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

  const handleSortChange = useCallback(
    (sortDir: SortDir): void => {
      updateSearch((prevState) => ({
        ...prevState,
        sortDir,
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

  const handleOrderOpen = useCallback(
    (orderId: string): void => {
      // Close drawer if is the same order
      if (drawer.isOpen && drawer.data === orderId) {
        setDrawer({
          isOpen: false,
          data: undefined,
        })
        return
      }

      setDrawer({
        isOpen: true,
        data: orderId,
      })
    },
    [drawer],
  )

  const handleOrderClose = useCallback((): void => {
    setDrawer({
      isOpen: false,
      data: undefined,
    })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: Order List | Devias Kit PRO</title>
      </Head>
      <Divider />
      <Box
        component='main'
        ref={rootRef}
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: 'flex',
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          <OrderListContainer open={drawer.isOpen}>
            <Box sx={{ p: 3 }}>
              <Stack
                alignItems='flex-start'
                direction='row'
                justifyContent='space-between'
                spacing={4}
              >
                <div>
                  <Typography variant='h4'>アカウント一覧</Typography>
                </div>
                <div>
                  <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant='contained'
                  >
                    登録
                  </Button>
                </div>
              </Stack>
            </Box>
            <Divider />
            <Stack spacing={4} style={{ marginRight: '20px', marginLeft: '20px' }}>
              <OrderListSearch
                onFiltersChange={handleFiltersChange}
                onSortChange={handleSortChange}
                sortBy={search.sortBy}
                sortDir={search.sortDir}
              />
            </Stack>
            <Divider />
            <Stack spacing={4} style={{ marginRight: '20px', marginLeft: '20px' }}>
              <OrderListTable2
                onOrderSelect={handleOrderOpen}
                customers={customers}
                customersCount={customersCount}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={search.rowsPerPage}
                page={search.page}
              />
            </Stack>
          </OrderListContainer>

          <OrderDrawer
            container={rootRef.current}
            onClose={handleOrderClose}
            open={drawer.isOpen}
            order={currentOrder}
          />
        </Box>
      </Box>
    </>
  )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
