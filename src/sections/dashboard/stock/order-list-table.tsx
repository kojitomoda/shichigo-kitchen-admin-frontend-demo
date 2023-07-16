import type { ChangeEvent, FC, MouseEvent } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import numeral from 'numeral'
import {
  Box,
  Button,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import type { Order, OrderStatus } from '../../../types/order'
import type { SeverityPillColor } from '../../../components/severity-pill'
import { SeverityPill } from '../../../components/severity-pill'
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01'
import { useState } from 'react'

const statusMap: Record<OrderStatus, SeverityPillColor> = {
  complete: 'success',
  pending: 'info',
  canceled: 'warning',
  rejected: 'error',
}

type OrderSummary = {
  id: number
  name: string
  totalCount: number
  image: string
}

const orderSummary: OrderSummary[] = [
  {
    id: 1,
    name: 'おにぎり・塩',
    totalCount: 40,
    image: '/assets/products/product-1.jpeg',
  },
  {
    id: 2,
    name: 'おにぎり・銀鮭',
    totalCount: 80,
    image: '/assets/products/product-2.jpeg',
  },
  {
    id: 3,
    name: '唐揚げ・塩',
    totalCount: 22,
    image: '/assets/products/product-3.jpeg',
  },
  {
    id: 4,
    name: '唐揚げ・甘ダレ',
    totalCount: 24,
    image: '/assets/products/product-4.jpeg',
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
      <Stack alignItems='center' direction='row' flexWrap='wrap' gap={3} sx={{ p: 3, px: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>商品画像</TableCell>
              <TableCell>商品名</TableCell>
              <TableCell>在庫数</TableCell>
              <TableCell>非表示</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.map((order) => {
              const buttonColor = order.totalCount === 0 ? 'error' : 'info'
              const buttonLabel = order.totalCount === 0 ? '非表示中' : '非表示にする'
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
                  <TableCell style={{ fontSize: '16px' }}>
                    <TextField
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
                      onClick={() => handleButtonClick(order.id)}
                    >
                      {buttonLabel}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Stack>
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='flex-end'
        spacing={1}
        sx={{ py: 3, paddingRight: '100px' }}
      >
        <Button type='submit' variant='contained' size='large'>
          2023年7月17日の在庫数を登録する
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
