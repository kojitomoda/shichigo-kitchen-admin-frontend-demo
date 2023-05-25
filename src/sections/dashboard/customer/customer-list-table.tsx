import type { ChangeEvent, FC, MouseEvent } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
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
import { Scrollbar } from '../../../components/scrollbar'
import { paths } from '../../../paths'
import type { Customer } from '../../../types/customer'
import { getInitials } from '../../../utils/get-initials'
import { SeverityPill } from '@/components/severity-pill'
import { useRouter } from 'next/navigation'

interface SelectionModel {
  deselectAll: () => void
  deselectOne: (customerId: string) => void
  selectAll: () => void
  selectOne: (customerId: string) => void
  selected: string[]
}

const useSelectionModel = (customers: Customer[]): SelectionModel => {
  const customerIds = useMemo(() => {
    return customers.map((customer) => customer.id)
  }, [customers])
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    setSelected([])
  }, [customerIds])

  const selectOne = useCallback((customerId: string): void => {
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

interface CustomerListTableProps {
  customers: Customer[]
  customersCount: number
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void
  page: number
  rowsPerPage: number
}

export const CustomerListTable: FC<CustomerListTableProps> = (props) => {
  const router = useRouter()
  const {
    customers,
    customersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props
  const { deselectAll, selectAll, deselectOne, selectOne, selected } = useSelectionModel(customers)

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

  const selectedAll = selected.length === customers.length
  const selectedSome = selected.length > 0 && selected.length < customers.length
  const enableBulkActions = selected.length > 0

  return (
    <Box sx={{ position: 'relative' }} {...other}>
      {enableBulkActions && (
        <Stack
          direction='row'
          spacing={2}
          sx={{
            alignItems: 'center',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
            display: enableBulkActions ? 'flex' : 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            px: 2,
            py: 0.5,
            zIndex: 10,
          }}
        >
          <Checkbox checked={selectedAll} indeterminate={selectedSome} onChange={handleToggleAll} />
          <Button color='inherit' size='small'>
            Delete
          </Button>
          <Button color='inherit' size='small'>
            Edit
          </Button>
        </Stack>
      )}
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>部屋番号</TableCell>
              <TableCell>状態</TableCell>
              <TableCell>最終ログイン日時</TableCell>
              <TableCell>メッセージ関連未読期間</TableCell>
              <TableCell align='right'>詳細</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => {
              const isSelected = selected.includes(customer.id)
              const statusColor =
                customer.status === '退去済'
                  ? 'warning'
                  : customer.status === '空室'
                  ? 'success'
                  : 'info'

              return (
                <TableRow
                  hover
                  key={customer.id}
                  selected={isSelected}
                  onClick={() => router.push('customers/:customerId')}
                >
                  <TableCell>{customer.roomNumber}</TableCell>
                  <TableCell>
                    <SeverityPill color={statusColor}>{customer.status}</SeverityPill>
                  </TableCell>
                  <TableCell>{customer.loginDate}</TableCell>
                  <TableCell>{customer.unreadPeriod}</TableCell>
                  <TableCell align='right'>
                    <IconButton component={NextLink} href={paths.dashboard.customers.details}>
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Scrollbar>
    </Box>
  )
}

CustomerListTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}
