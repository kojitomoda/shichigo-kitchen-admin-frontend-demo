import type { ChangeEvent, FC, MouseEvent } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import numeral from 'numeral'
import {
  Box,
  Button,
  Card,
  Divider,
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
  TextField,
  Typography,
} from '@mui/material'
import type { Order, OrderStatus } from '../../../types/order'
import type { SeverityPillColor } from '../../../components/severity-pill'
import { SeverityPill } from '../../../components/severity-pill'
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01'
import { useCallback, useEffect, useState } from 'react'
import { display } from '@mui/system'
import { Product } from '@/types/product'
import { data } from '@/api/products/data'

const statusMap: Record<OrderStatus, SeverityPillColor> = {
  complete: 'success',
  pending: 'info',
  canceled: 'warning',
  rejected: 'error',
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

type OrderSummary = {
  id: number
  name: string
  totalCount: number
  image: string
  category: string
}

const orderSummary: OrderSummary[] = [
  {
    id: 1,
    name: 'おにぎり・塩',
    totalCount: 40,
    image: '/assets/products/product-1.jpeg',
    category: 'constant',
  },
  {
    id: 2,
    name: 'おにぎり・銀鮭',
    totalCount: 80,
    image: '/assets/products/product-2.jpeg',
    category: 'change',
  },
  {
    id: 3,
    name: '唐揚げ・塩',
    totalCount: 22,
    image: '/assets/products/product-3.jpeg',
    category: 'constant',
  },
  {
    id: 4,
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
  const [order, setOrder] = useState<OrderSummary[]>(orderSummary)
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

  const [products, setProducts] = useState<OrderSummary[]>(orderSummary)
  const [currentTab, setCurrentTab] = useState('constant')

  const handleTabsChange = useCallback((event: ChangeEvent<{}>, tab: string): void => {
    setCurrentTab(tab)
  }, [])

  const handleChange = (
    id: number,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const updatedOrder = order.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          totalCount: Number(event.target.value), // 入力値を数値に変換して反映させる
        }
      }
      return item
    })

    setOrder(updatedOrder) // order状態を更新
  }

  useEffect(() => {
    const newProducts = orderSummary.filter((product) => product.category === currentTab)
    setProducts(newProducts)
  }, [currentTab])

  const handleButtonClick = (id: number) => {
    const updatedOrder = order.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          totalCount: 0, // 入力値を数値に変換して反映させる
        }
      }
      return item
    })

    setOrder(updatedOrder) // order状態を更新
  }
  return (
    <div {...other}>
      <Stack alignItems='center' direction='row' flexWrap='wrap' gap={3} sx={{ px: 5 }}>
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
          <div style={{ display: 'flex', overflowX: 'scroll' }}>
            <TableBody>
              <span
                style={{
                  display: 'flex',
                  fontWeight: 'bold',
                  marginLeft: '50px',
                  justifyContent: 'center',
                }}
              >
                7/20
              </span>
              {products.map((order) => {
                const buttonColor = order.totalCount === 0 ? 'error' : 'info'
                const buttonLabel = order.totalCount === 0 ? '非表示中' : '非表示'
                return (
                  <TableRow key={order.id} sx={{ cursor: 'pointer' }}>
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
                              height: 50,
                              justifyContent: 'center',
                              overflow: 'hidden',
                              width: 50,
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              alignItems: 'center',
                              backgroundColor: 'neutral.50',
                              borderRadius: 1,
                              display: 'flex',
                              height: 50,
                              justifyContent: 'center',
                              width: 50,
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
                    <TableCell style={{ fontSize: '16px' }}>
                      <TextField
                        type='number'
                        name='roomCount'
                        value={order.totalCount}
                        style={{ width: '100px' }}
                        onChange={(event) => handleChange(order.id, event)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size={'small'}
                        variant='contained'
                        color={buttonColor}
                        onClick={() => handleButtonClick(order.id)}
                      >
                        {buttonLabel}
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableBody>
              <span style={{ display: 'flex', fontWeight: 'bold', marginLeft: '20px' }}>7/21</span>
              {products.map((order) => {
                const buttonColor = order.totalCount === 0 ? 'error' : 'info'
                const buttonLabel = order.totalCount === 0 ? '非表示中' : '非表示'
                return (
                  <TableRow key={order.id} sx={{ cursor: 'pointer' }}>
                    {' '}
                    <TableCell style={{ fontSize: '16px' }}>
                      <TextField
                        style={{ width: '100px' }}
                        type='number'
                        name='roomCount'
                        value={order.totalCount}
                        onChange={(event) => handleChange(order.id, event)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size={'small'}
                        variant='contained'
                        color={buttonColor}
                        onClick={() => handleButtonClick(order.id)}
                      >
                        {buttonLabel}
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableBody>
              <span style={{ display: 'flex', fontWeight: 'bold', marginLeft: '20px' }}>7/22</span>
              {products.map((order) => {
                const buttonColor = order.totalCount === 0 ? 'error' : 'info'
                const buttonLabel = order.totalCount === 0 ? '非表示中' : '非表示'
                return (
                  <TableRow key={order.id} sx={{ cursor: 'pointer' }}>
                    {' '}
                    <TableCell style={{ fontSize: '16px' }}>
                      <TextField
                        style={{ width: '100px' }}
                        type='number'
                        name='roomCount'
                        value={order.totalCount}
                        onChange={(event) => handleChange(order.id, event)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='contained'
                        color={buttonColor}
                        size={'small'}
                        onClick={() => handleButtonClick(order.id)}
                      >
                        {buttonLabel}
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableBody>
              <span style={{ display: 'flex', fontWeight: 'bold', marginLeft: '20px' }}>7/23</span>
              {products.map((order) => {
                const buttonColor = order.totalCount === 0 ? 'error' : 'info'
                const buttonLabel = order.totalCount === 0 ? '非表示中' : '非表示'
                return (
                  <TableRow key={order.id} sx={{ cursor: 'pointer' }}>
                    {' '}
                    <TableCell style={{ fontSize: '16px' }}>
                      <TextField
                        style={{ width: '100px' }}
                        type='number'
                        name='roomCount'
                        value={order.totalCount}
                        onChange={(event) => handleChange(order.id, event)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='contained'
                        color={buttonColor}
                        size={'small'}
                        onClick={() => handleButtonClick(order.id)}
                      >
                        {buttonLabel}
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </div>
        </Card>
      </Stack>
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='flex-end'
        spacing={1}
        sx={{ py: 3, paddingRight: '100px' }}
      >
        <Button type='submit' variant='contained' size='large'>
          在庫数を更新する
        </Button>
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
