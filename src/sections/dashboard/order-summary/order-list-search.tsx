import type { ChangeEvent, FC, FormEvent } from 'react'
import { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  TextField,
} from '@mui/material'
import { useUpdateEffect } from '../../../hooks/use-update-effect'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { clients } from '@/utils/constants'

interface Filters {
  query?: string
  status?: string
}

type TabValue = 'all' | 'canceled' | 'complete' | 'pending' | 'rejected'

interface TabOption {
  label: string
  value: TabValue
}

const tabOptions: TabOption[] = [
  {
    label: 'すべて',
    value: 'all',
  },
  {
    label: '未処理',
    value: 'pending',
  },
  {
    label: '完了',
    value: 'complete',
  },
  {
    label: 'キャンセル',
    value: 'canceled',
  },
]

type SortDir = 'asc' | 'desc'

interface SortOption {
  label: string
  value: SortDir
}

const sortOptions: SortOption[] = [
  {
    label: 'Newest',
    value: 'desc',
  },
  {
    label: 'Oldest',
    value: 'asc',
  },
]

interface OrderListSearchProps {
  onFiltersChange?: (filters: Filters) => void
  onSortChange?: (sort: SortDir) => void
  sortBy?: string
  sortDir?: 'asc' | 'desc'
}

export const OrderListSearch: FC<OrderListSearchProps> = (props) => {
  const { onFiltersChange, onSortChange, sortBy = 'createdAt', sortDir = 'asc' } = props
  const queryRef = useRef<HTMLInputElement | null>(null)
  const [currentTab, setCurrentTab] = useState<TabValue>('all')
  const [filters, setFilters] = useState<Filters>({
    query: undefined,
    status: undefined,
  })

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters)
  }, [filters, onFiltersChange])

  useUpdateEffect(() => {
    handleFiltersUpdate()
  }, [filters, handleFiltersUpdate])

  const handleTabsChange = useCallback((event: ChangeEvent<{}>, tab: TabValue): void => {
    setCurrentTab(tab)
    const status = tab === 'all' ? undefined : tab

    setFilters((prevState) => ({
      ...prevState,
      status,
    }))
  }, [])

  const handleQueryChange = useCallback((event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const query = queryRef.current?.value || ''
    setFilters((prevState) => ({
      ...prevState,
      query,
    }))
  }, [])

  const handleSortChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const sortDir = event.target.value as SortDir
      onSortChange?.(sortDir)
    },
    [onSortChange],
  )

  return (
    <div>
      {/*<Tabs*/}
      {/*  indicatorColor='primary'*/}
      {/*  onChange={handleTabsChange}*/}
      {/*  scrollButtons='auto'*/}
      {/*  sx={{ px: 3 }}*/}
      {/*  textColor='primary'*/}
      {/*  value={currentTab}*/}
      {/*  variant='scrollable'*/}
      {/*>*/}
      {/*  {tabOptions.map((tab) => (*/}
      {/*    <Tab key={tab.value} label={tab.label} value={tab.value} />*/}
      {/*  ))}*/}
      {/*</Tabs>*/}
      <Divider />
      <Stack alignItems='center' direction='row' flexWrap='wrap' gap={3} sx={{ p: 3 }}>
        <div>
          <DatePicker
            inputFormat='yyyy/MM/dd'
            label='お届け日'
            onChange={() => {}}
            renderInput={(inputProps) => <TextField {...inputProps} />}
            value={new Date()}
          />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            defaultValue='web'
            fullWidth
            label='取引先'
            name='platform'
            select
            SelectProps={{ native: true }}
          >
            <option value='all'>{'取引先を絞らない'}</option>
            {clients.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </TextField>
        </Box>
        <Button
          size='large'
          startIcon={
            <SvgIcon>
              <SearchMdIcon />
            </SvgIcon>
          }
          variant='contained'
        >
          検索
        </Button>
      </Stack>
    </div>
  )
}

OrderListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf<SortDir>(['asc', 'desc']),
}
