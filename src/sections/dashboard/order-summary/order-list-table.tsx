import type { ChangeEvent, FC, MouseEvent } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import numeral from 'numeral'
import {
  Box,
  Card,
  Stack,
  SvgIcon,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material'
import type { Order, OrderStatus } from '../../../types/order'
import type { SeverityPillColor } from '../../../components/severity-pill'
import { SeverityPill } from '../../../components/severity-pill'
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01'
import { useCallback, useEffect, useState } from 'react'
import { Product } from '@/types/product'
import { data } from '@/api/products/data'

const statusMap: Record<OrderStatus, SeverityPillColor> = {
  complete: 'success',
  pending: 'info',
  canceled: 'warning',
  rejected: 'error',
}

type OrderSummary = {
  id: string
  name: string
  totalCount: number
  image: string
  category: string
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

const orderSummary: OrderSummary[] = [
  {
    id: '5ecb8a6d9f53bfae09e16115',
    name: 'おにぎり・塩',
    totalCount: 40,
    image: '/assets/products/product-1.jpeg',
    category: 'constant',
  },
  {
    id: '5ecb8a6d9f53bfae09e16115',
    name: 'おにぎり・銀鮭',
    totalCount: 80,
    image: '/assets/products/product-2.jpeg',
    category: 'change',
  },
  {
    id: '5ecb8a6d9f53bfae09e16115',
    name: '唐揚げ・塩',
    totalCount: 22,
    image: '/assets/products/product-3.jpeg',
    category: 'constant',
  },
  {
    id: '5ecb8a6d9f53bfae09e16115',
    name: '唐揚げ・甘ダレ',
    totalCount: 24,
    image: '/assets/products/product-4.jpeg',
    category: 'change',
  },
]
interface OrderListTableProps {
  onOrderSelect?: (orderId: string) => void
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void
  orders: Order[]
  ordersCount: number
  page: number
  rowsPerPage: number
}

export const OrderListTable: FC<OrderListTableProps> = (props) => {
  const {
    onOrderSelect,
    onPageChange,
    onRowsPerPageChange,
    orders,
    ordersCount,
    page,
    rowsPerPage,
    ...other
  } = props

  const [currentTab, setCurrentTab] = useState('constant')
  const [products, setProducts] = useState<OrderSummary[]>(orderSummary)
  const handleTabsChange = useCallback((event: ChangeEvent<{}>, tab: string): void => {
    setCurrentTab(tab)
  }, [])

  useEffect(() => {
    const newProducts = orderSummary.filter((product) => product.category === currentTab)
    setProducts(newProducts)
  }, [currentTab])

  return (
    <div {...other}>
      <Stack sx={{ pb: 3, px: 5 }}>
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>商品画像</TableCell>
                <TableCell>商品名</TableCell>
                <TableCell>注文数</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((order) => {
                return (
                  <TableRow
                    hover
                    key={order.id}
                    onClick={() => onOrderSelect?.(order.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {' '}
                    <TableCell width='18%'>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        {order.image ? (
                          <Box
                            sx={{
                              alignItems: 'center',
                              backgroundColor: 'neutral.50',
                              backgroundImage: `url(${order.image})`,
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              borderRadius: 1,
                              display: 'flex',
                              height: 60,
                              justifyContent: 'center',
                              overflow: 'hidden',
                              width: 60,
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              alignItems: 'center',
                              backgroundColor: 'neutral.50',
                              borderRadius: 1,
                              display: 'flex',
                              height: 60,
                              justifyContent: 'center',
                              width: 60,
                            }}
                          >
                            <SvgIcon>
                              <Image01Icon />
                            </SvgIcon>
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell style={{ fontSize: '16px' }}>{order.totalCount}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Card>
      </Stack>
    </div>
  )
}

OrderListTable.propTypes = {
  onOrderSelect: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  orders: PropTypes.array.isRequired,
  ordersCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}
