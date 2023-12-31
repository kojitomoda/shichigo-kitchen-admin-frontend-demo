import type { ChangeEvent, FC, MouseEvent } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import numeral from 'numeral'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import type { Order, OrderStatus } from '../../../types/order'
import type { SeverityPillColor } from '../../../components/severity-pill'
import { SeverityPill } from '../../../components/severity-pill'

const statusMap: Record<OrderStatus, SeverityPillColor> = {
  complete: 'success',
  pending: 'info',
  canceled: 'warning',
  rejected: 'error',
}

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
      <Table>
        <TableBody>
          {orders.map((order) => {
            const createdAtMonth = format(order.createdAt, 'LLL').toUpperCase()
            const createdAtDay = format(order.createdAt, 'd')
            const totalAmount = numeral(order.totalAmount).format(`${order.currency}0,0.00`)
            const statusColor = statusMap[order.status] || 'warning'
            const orderState =
              order.status === 'pending'
                ? '未処理'
                : order.status === 'canceled'
                ? 'キャンセル'
                : order.status === 'complete'
                ? '完了'
                : '拒否'

            return (
              <TableRow
                hover
                key={order.id}
                onClick={() => onOrderSelect?.(order.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.200',
                      borderRadius: 2,
                      maxWidth: 'fit-content',
                      ml: 3,
                      p: 1,
                    }}
                  >
                    <Typography align='center' variant='subtitle2'>
                      2023/07/17
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{order.company}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{order.totalAmount}円</TableCell>
                <TableCell align='right'>
                  <SeverityPill color={statusColor}>{orderState}</SeverityPill>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <TablePagination
        component='div'
        count={ordersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10]}
      />
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
