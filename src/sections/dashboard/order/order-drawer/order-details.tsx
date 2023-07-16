import type { FC } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import numeral from 'numeral'
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02'
import type { Theme } from '@mui/material'
import {
  Button,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { PropertyList } from '../../../../components/property-list'
import { PropertyListItem } from '../../../../components/property-list-item'
import type { SeverityPillColor } from '../../../../components/severity-pill'
import { SeverityPill } from '../../../../components/severity-pill'
import { Scrollbar } from '../../../../components/scrollbar'
import type { Order, OrderStatus } from '../../../../types/order'

const statusMap: Record<OrderStatus, string> = {
  canceled: 'warning',
  complete: 'success',
  pending: 'info',
  rejected: 'error',
}

interface OrderDetailsProps {
  onApprove?: () => void
  onEdit?: () => void
  onReject?: () => void
  order: Order
}

const orders = [
  {
    id: 1,
    name: 'おにぎり・塩',
    quo: '2',
  },
  {
    id: 2,
    name: 'おにぎり・銀鮭',
    quo: '2',
  },
  {
    id: 3,
    name: '唐揚げ・塩',
    quo: '1',
  },
]

export const OrderDetails: FC<OrderDetailsProps> = (props) => {
  const { onApprove, onEdit, onReject, order } = props
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  const align = lgUp ? 'horizontal' : 'vertical'
  const items = order.items || []
  const createdAt = format(order.createdAt, 'dd/MM/yyyy HH:mm')
  const statusColor = statusMap[order.status] as SeverityPillColor
  const totalAmount = numeral(order.totalAmount).format(`${order.currency}0,0.00`)

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Stack alignItems='center' direction='row' justifyContent='space-between' spacing={3}>
          <Typography variant='h6'>注文詳細</Typography>
        </Stack>
        <PropertyList>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label='注文コード'
            value={'sdfj23fs-ffsfs'}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label='取引先名'
            value={'アイリスオーヤマ'}
          />
          <PropertyListItem align={align} disableGutters divider label='お客様名'>
            <Typography color='text.secondary' variant='body2'>
              {'友田 晃司'}
            </Typography>
          </PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label='お届け日'
            value={'2023/07/17'}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label='注文日時'
            value={'2023/07/14 09:30'}
          />
          {/*<PropertyListItem*/}
          {/*  align={align}*/}
          {/*  disableGutters*/}
          {/*  divider*/}
          {/*  label='Promotion Code'*/}
          {/*  value={order.promotionCode}*/}
          {/*/>*/}
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label='合計金額'
            value={'1,200円'}
          />
          <PropertyListItem align={align} disableGutters divider label='Status'>
            <SeverityPill color={statusColor}>{'未処理'}</SeverityPill>
          </PropertyListItem>
        </PropertyList>
      </Stack>
      <Stack spacing={3}>
        <Typography variant='h6'>商品一覧</Typography>
        <Scrollbar>
          <Table sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell>商品名</TableCell>
                <TableCell>個数</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quo}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Scrollbar>
      </Stack>
      <Stack
        alignItems='center'
        direction='row'
        flexWrap='wrap'
        justifyContent='flex-end'
        spacing={2}
        sx={{
          py: 4,
        }}
      >
        <Button onClick={onApprove} size='small' variant='contained'>
          承認
        </Button>
        <Button color='error' onClick={onReject} size='small' variant='outlined'>
          キャンセル
        </Button>
      </Stack>
    </Stack>
  )
}

OrderDetails.propTypes = {
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func,
  // @ts-ignore
  order: PropTypes.object,
}
