import type { FC } from 'react'
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react'
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

interface Filters {
  query?: string
  hasAcceptedMarketing?: boolean
  isProspect?: boolean
  isReturning?: boolean
}

type TabValue = 'all' | 'hasAcceptedMarketing' | 'isProspect' | 'isReturning'

interface TabOption {
  label: string
  value: TabValue
}

const tabs: TabOption[] = [
  {
    label: 'すべて',
    value: 'all',
  },
  {
    label: '入居中',
    value: 'hasAcceptedMarketing',
  },
  {
    label: '入居予定',
    value: 'isReturning',
  },
  {
    label: '空室',
    value: 'isProspect',
  },
]

type SortValue = '未読期間|古い順' | '未読期間|新しい順' | 'totalOrders|desc' | 'totalOrders|asc'

interface SortOption {
  label: string
  value: SortValue
}

const sortOptions: SortOption[] = [
  {
    label: '未読期間 | 古い順',
    value: '未読期間|古い順',
  },
  {
    label: '最終ログイン日時 | 古い順',
    value: 'totalOrders|desc',
  },
]

type SortDir = 'asc' | 'desc'

interface CustomerListSearchProps {
  onFiltersChange?: (filters: Filters) => void
  onSortChange?: (sort: { sortBy: string; sortDir: SortDir }) => void
  sortBy?: string
  sortDir?: SortDir
}

export const CustomerListSearch: FC<CustomerListSearchProps> = (props) => {
  const { onFiltersChange, onSortChange, sortBy, sortDir } = props
  const queryRef = useRef<HTMLInputElement | null>(null)
  const [currentTab, setCurrentTab] = useState<TabValue>('all')
  const [filters, setFilters] = useState<Filters>({})

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters)
  }, [filters, onFiltersChange])

  useUpdateEffect(() => {
    handleFiltersUpdate()
  }, [filters, handleFiltersUpdate])

  const handleTabsChange = useCallback((event: ChangeEvent<{}>, value: TabValue): void => {
    setCurrentTab(value)
    setFilters((prevState: any) => {
      const updatedFilters: Filters = {
        ...prevState,
        hasAcceptedMarketing: undefined,
        isProspect: undefined,
        isReturning: undefined,
      }

      if (value !== 'all') {
        updatedFilters[value] = true
      }

      return updatedFilters
    })
  }, [])

  const handleQueryChange = useCallback((event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setFilters((prevState: any) => ({
      ...prevState,
      query: queryRef.current?.value,
    }))
  }, [])

  const handleSortChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const [sortBy, sortDir] = event.target.value.split('|') as [string, SortDir]

      onSortChange?.({
        sortBy,
        sortDir,
      })
    },
    [onSortChange],
  )

  return (
    <>
      <Tabs
        indicatorColor='primary'
        onChange={handleTabsChange}
        scrollButtons='auto'
        sx={{ px: 3 }}
        textColor='primary'
        value={currentTab}
        variant='scrollable'
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      <Divider />
      <Stack alignItems='center' direction='row' flexWrap='wrap' spacing={3} sx={{ p: 3 }}>
        <Box component='form' onSubmit={handleQueryChange} sx={{ flexGrow: 1 }}>
          <OutlinedInput
            defaultValue=''
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder='部屋番号を入力する'
            startAdornment={
              <InputAdornment position='start'>
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </Box>
        <TextField label='未読期間' name='a' value=''></TextField>
        <span style={{ marginLeft: '5px', fontSize: '12px' }}>日以上</span>
        <TextField
          label='Sort By'
          name='sort'
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={sortDir}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Button
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
    </>
  )
}

CustomerListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf<SortDir>(['asc', 'desc']),
}
