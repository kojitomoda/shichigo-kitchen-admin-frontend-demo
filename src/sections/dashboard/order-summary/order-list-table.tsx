import type { ChangeEvent, FC, MouseEvent } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import numeral from 'numeral'
import {
  Box,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import type { Order, OrderStatus } from '../../../types/order'
import type { SeverityPillColor } from '../../../components/severity-pill'
import { SeverityPill } from '../../../components/severity-pill'
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01'

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
}

const orderSummary: OrderSummary[] = [
  {
    id: '5ecb8a6d9f53bfae09e16115',
    name: 'おにぎり・塩',
    totalCount: 40,
    image: '/assets/products/product-1.jpeg',
  },
  {
    id: '5ecb8a6d9f53bfae09e16115',
    name: 'おにぎり・銀鮭',
    totalCount: 80,
    image: '/assets/products/product-2.jpeg',
  },
  {
    id: '5ecb8a6d9f53bfae09e16115',
    name: '唐揚げ・塩',
    totalCount: 22,
    image: '/assets/products/product-3.jpeg',
  },
  {
    id: '5ecb8a6d9f53bfae09e16115',
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

  return (
    <div {...other}>
      <Stack alignItems='center' direction='row' flexWrap='wrap' gap={3} sx={{ p: 3, px: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>商品画像</TableCell>
              <TableCell>商品名</TableCell>
              <TableCell>個数</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderSummary.map((order) => {
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
