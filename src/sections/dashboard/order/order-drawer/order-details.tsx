import type { FC } from 'react'
import PropTypes from 'prop-types'
import { format, subDays, subHours } from 'date-fns'
import numeral from 'numeral'
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02'
import type { Theme } from '@mui/material'
import {
  Button,
  Checkbox,
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
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Customer } from '@/types/customer'

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
interface SelectionModel {
  deselectAll: () => void
  deselectOne: (customerId: string) => void
  selectAll: () => void
  selectOne: (customerId: string) => void
  selected: string[]
}

interface SelectionModelRole {
  deselectAllRole: () => void
  deselectOneRole: (customerId: string) => void
  selectAllRole: () => void
  selectOneRole: (customerId: string) => void
  selectedRole: string[]
}

const useSelectionModel = (customers: Customer[]): SelectionModel => {
  const customerIds = useMemo(() => {
    return customers.map((customer) => customer.id)
  }, [customers])
  const [selected, setSelected] = useState<string[]>([
    '5e887ac47eed253091be10cb',
    '5e887b209c28ac3dd97f6db5',
  ])

  const selectOne = useCallback((customerId: string): void => {
    console.log(customerId)
    setSelected((prevState) => [...prevState, customerId])
  }, [])

  const deselectOne = useCallback((customerId: string): void => {
    setSelected((prevState) => {
      return prevState.filter((id) => id !== customerId)
    })
  }, [])

  const selectAll = useCallback((): void => {
    setSelected([...customerIds])
  }, [customerIds])

  const deselectAll = useCallback(() => {
    setSelected([])
  }, [])

  return {
    deselectAll,
    deselectOne,
    selectAll,
    selectOne,
    selected,
  }
}

const useSelectionRoleModel = (customers: Customer[]): SelectionModelRole => {
  const customerIds = useMemo(() => {
    return customers.map((customer) => customer.id)
  }, [customers])
  const [selectedRole, setSelected] = useState<string[]>(['1'])

  const selectOneRole = useCallback((customerId: string): void => {
    setSelected((prevState) => [customerId])
  }, [])

  const deselectOneRole = useCallback((customerId: string): void => {
    setSelected((prevState) => {
      return prevState.filter((id) => id !== customerId)
    })
  }, [])

  const selectAllRole = useCallback((): void => {
    setSelected([...customerIds])
  }, [customerIds])

  const deselectAllRole = useCallback(() => {
    setSelected([])
  }, [])

  return {
    deselectAllRole,
    deselectOneRole,
    selectAllRole,
    selectOneRole,
    selectedRole,
  }
}
export const OrderDetails: FC<OrderDetailsProps> = (props) => {
  const now = new Date()
  const roles: any[] = [
    {
      id: '1',
      name: '管理者',
    },
    {
      id: '2',
      name: '議事録担当',
    },
    {
      id: '3',
      name: 'お知らせ担当',
    },
    {
      id: '4',
      name: '広告担当',
    },
  ]
  const customers: any[] = [
    {
      id: '5e887ac47eed253091be10cb',
      avatar: '/assets/avatars/avatar-carson-darrin.png',
      city: 'Cleveland',
      country: '東京都',
      currency: '$',
      email: 'carson.darrin@devias.io',
      hasAcceptedMarketing: true,
      isProspect: false,
      isReturning: true,
      name: 'パークホームズ柏たなか',
    },
    {
      id: '5e887b209c28ac3dd97f6db5',
      avatar: '/assets/avatars/avatar-fran-perez.png',
      city: 'Atlanta',
      country: '千葉県',
      currency: '$',
      email: 'fran.perez@devias.io',
      hasAcceptedMarketing: true,
      isProspect: true,
      isReturning: false,
      name: '幕張ベイパーク',
      state: 'Georgia',
      totalSpent: 0.0,
      totalOrders: 0,
      updatedAt: subDays(subHours(now, 1), 2).getTime(),
      loginDate: '2023/03/05 17:22:10',
      loginId: '234234532432',
    },
    {
      id: '5e887b7602bdbc4dbb234b27',
      avatar: '/assets/avatars/avatar-jie-yan-song.png',
      city: 'North Canton',
      country: '千葉県',
      currency: '$',
      email: 'jie.yan.song@devias.io',
      hasAcceptedMarketing: false,
      isProspect: false,
      isReturning: false,
      name: 'パークホームズ昭島中神',
      state: 'Ohio',
      totalSpent: 5600.0,
      totalOrders: 6,
      updatedAt: subDays(subHours(now, 4), 2).getTime(),
      loginDate: '2023/03/05 17:22:10',
      loginId: '234234532432',
    },
    {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      city: 'Madrid',
      country: '神奈川県',
      currency: '$',
      email: 'anika.visser@devias.io',
      hasAcceptedMarketing: true,
      isProspect: false,
      isReturning: true,
      name: 'ザ・ガーデンズ稲毛海岸',
      state: 'Madrid',
      totalSpent: 500.0,
      totalOrders: 1,
      updatedAt: subDays(subHours(now, 11), 2).getTime(),
      loginDate: '2023/03/05 17:22:10',
      loginId: '234234532432',
    },
    {
      id: '5e86805e2bafd54f66cc95c3',
      avatar: '/assets/avatars/avatar-miron-vitold.png',
      city: 'San Diego',
      country: '群馬県',
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
    },
    {
      id: '5e887a1fbefd7938eea9c981',
      avatar: '/assets/avatars/avatar-penjani-inyene.png',
      city: 'Berkeley',
      country: '群馬県',
      currency: '$',
      email: 'penjani.inyene@devias.io',
      hasAcceptedMarketing: false,
      isProspect: true,
      isReturning: false,
      name: 'パークタワー西新宿',
      state: 'California',
      totalSpent: 0.0,
      totalOrders: 0,
      updatedAt: subDays(subHours(now, 5), 4).getTime(),
      loginDate: '2023/03/05 17:22:10',
      loginId: '234234532432',
    },
    {
      id: '5e887d0b3d090c1b8f162003',
      avatar: '/assets/avatars/avatar-omar-darboe.png',
      currency: '群馬県',
      email: 'omar.darobe@devias.io',
      hasAcceptedMarketing: true,
      isProspect: false,
      isReturning: false,
      city: 'Carson City',
      country: 'USA',
      name: '三田ガーデンヒルズ',
      state: 'Nevada',
      totalSpent: 100.0,
      totalOrders: 4,
      updatedAt: subDays(subHours(now, 15), 4).getTime(),
      loginDate: '2023/03/05 17:22:10',
      loginId: '234234532432',
    },
    {
      id: '5e88792be2d4cfb4bf0971d9',
      avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
      city: 'Los Angeles',
      country: '群馬県',
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
    },
    {
      id: '5e8877da9a65442b11551975',
      avatar: '/assets/avatars/avatar-iulia-albu.png',
      city: 'Murray',
      country: '群馬県',
      email: 'iulia.albu@devias.io',
      hasAcceptedMarketing: true,
      isProspect: true,
      isReturning: false,
      name: 'パークシティ高田馬場',
      state: 'Utah',
      totalSpent: 0.0,
      totalOrders: 0,
      updatedAt: subDays(subHours(now, 8), 6).getTime(),
      loginDate: '2023/03/05 17:22:10',
      loginId: '234234532432',
    },
  ]
  const { onApprove, onEdit, onReject, order } = props
  const { deselectAll, selectAll, deselectOne, selectOne, selected } = useSelectionModel(customers)
  const { deselectAllRole, deselectOneRole, selectAllRole, selectOneRole, selectedRole } =
    useSelectionRoleModel(roles)
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  const align = lgUp ? 'horizontal' : 'vertical'
  const items = order.items || []
  const createdAt = format(order.createdAt, 'dd/MM/yyyy HH:mm')
  const statusColor = statusMap[order.status] as SeverityPillColor
  const totalAmount = numeral(order.totalAmount).format(`${order.currency}0,0.00`)
  const selectedAll = selected.length === customers.length
  const selectedSome = selected.length > 0 && selected.length < customers.length
  const enableBulkActions = selected.length > 0
  const handleToggleAll = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const { checked } = event.target

      if (checked) {
        selectAll()
      } else {
        deselectAll()
      }
    },
    [selectAll, deselectAll],
  )

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        {/*<Stack alignItems='center' direction='row' justifyContent='space-around' spacing={3}>*/}
        {/*  <Typography variant='h6'>権限</Typography>*/}
        {/*  <Typography variant='h6'>管理者</Typography>*/}
        {/*  <Button*/}
        {/*    color='inherit'*/}
        {/*    onClick={onEdit}*/}
        {/*    size='small'*/}
        {/*    startIcon={*/}
        {/*      <SvgIcon>*/}
        {/*        <Edit02Icon />*/}
        {/*      </SvgIcon>*/}
        {/*    }*/}
        {/*  >*/}
        {/*    Edit*/}
        {/*  </Button>*/}
        {/*</Stack>*/}
        {/*<PropertyList>*/}
        {/*  <PropertyListItem align={align} disableGutters divider label='権限名' value='管理者' />*/}
        {/*  <PropertyListItem*/}
        {/*    align={align}*/}
        {/*    disableGutters*/}
        {/*    divider*/}
        {/*    label='Number'*/}
        {/*    value={order.number}*/}
        {/*  />*/}
        {/*  <PropertyListItem align={align} disableGutters divider label='Customer'>*/}
        {/*    <Typography color='text.secondary' variant='body2'>*/}
        {/*      {order.customer.name}*/}
        {/*    </Typography>*/}
        {/*    <Typography color='text.secondary' variant='body2'>*/}
        {/*      {order.customer.address1}*/}
        {/*    </Typography>*/}
        {/*    <Typography color='text.secondary' variant='body2'>*/}
        {/*      {order.customer.city}*/}
        {/*    </Typography>*/}
        {/*    <Typography color='text.secondary' variant='body2'>*/}
        {/*      {order.customer.country}*/}
        {/*    </Typography>*/}
        {/*  </PropertyListItem>*/}
        {/*  <PropertyListItem align={align} disableGutters divider label='Date' value={createdAt} />*/}
        {/*  <PropertyListItem*/}
        {/*    align={align}*/}
        {/*    disableGutters*/}
        {/*    divider*/}
        {/*    label='Promotion Code'*/}
        {/*    value={order.promotionCode}*/}
        {/*  />*/}
        {/*  <PropertyListItem*/}
        {/*    align={align}*/}
        {/*    disableGutters*/}
        {/*    divider*/}
        {/*    label='Total Amount'*/}
        {/*    value={totalAmount}*/}
        {/*  />*/}
        {/*  <PropertyListItem align={align} disableGutters divider label='Status'>*/}
        {/*    <SeverityPill color={statusColor}>{order.status}</SeverityPill>*/}
        {/*  </PropertyListItem>*/}
        {/*</PropertyList>*/}
      </Stack>
      <Stack spacing={3}>
        <Typography variant='h6'>権限選択</Typography>
        <Scrollbar>
          <Table sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell padding='checkbox'>
                  {/*<Checkbox*/}
                  {/*  checked={selectedAll}*/}
                  {/*  indeterminate={selectedSome}*/}
                  {/*  onChange={handleToggleAll}*/}
                  {/*/>*/}
                </TableCell>
                <TableCell>権限名</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => {
                const isSelected = selectedRole.includes(role.id)
                return (
                  <TableRow key={role.id}>
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={isSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                          const { checked } = event.target

                          if (checked) {
                            selectOneRole(role.id)
                          } else {
                            deselectOneRole(role.id)
                          }
                        }}
                        value={isSelected}
                      />
                    </TableCell>
                    <TableCell>{role.name}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Scrollbar>
      </Stack>
      <Stack spacing={3}>
        <Typography variant='h6'>建物選択</Typography>
        <Scrollbar>
          <Table sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell padding='checkbox'>
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={handleToggleAll}
                  />
                </TableCell>
                <TableCell>建物名</TableCell>
                <TableCell>場所</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => {
                const isSelected = selected.includes(customer.id)
                return (
                  <TableRow key={customer.id}>
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={isSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                          const { checked } = event.target

                          if (checked) {
                            selectOne(customer.id)
                          } else {
                            deselectOne(customer.id)
                          }
                        }}
                        value={isSelected}
                      />
                    </TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.country}</TableCell>
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
      >
        <Button onClick={onApprove} size='large' variant='contained' color='error'>
          アカウント削除
        </Button>
        <Button onClick={onApprove} size='large' variant='contained' color='success'>
          更新
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
