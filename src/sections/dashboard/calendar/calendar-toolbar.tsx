import type { ChangeEvent, FC, ReactNode } from 'react'
import { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import ChevronLeftIcon from '@untitled-ui/icons-react/build/esm/ChevronLeft'
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {
  Button,
  IconButton,
  Stack,
  SvgIcon,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import type { CalendarView } from '../../../types/calendar'

interface ViewOption {
  label: string
  value: CalendarView
}

const viewOptions: ViewOption[] = [
  {
    label: 'Month',
    value: 'dayGridMonth',
  },
  {
    label: 'Week',
    value: 'timeGridWeek',
  },
  {
    label: 'Day',
    value: 'timeGridDay',
  },
  {
    label: 'Agenda',
    value: 'listWeek',
  },
]

interface CalendarToolbarProps {
  children?: ReactNode
  date: Date
  onAddClick?: () => void
  onAddClickTrashCategory?: () => void
  onDateNext?: () => void
  onDatePrev?: () => void
  onDateToday?: () => void
  onViewChange?: (view: CalendarView) => void
  view: CalendarView
}

export const CalendarToolbar: FC<CalendarToolbarProps> = (props) => {
  const {
    date,
    onAddClick,
    onAddClickTrashCategory,
    onDateNext,
    onDatePrev,
    onDateToday,
    onViewChange,
    view,
    ...other
  } = props
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const handleViewChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      onViewChange?.(event.target.value as CalendarView)
    },
    [onViewChange],
  )

  const dateMonth = format(date, 'MMMM')
  const dateDay = format(date, 'y')

  // On mobile allow only timeGridDay and agenda views

  const availableViewOptions = useMemo(() => {
    return mdUp
      ? viewOptions
      : viewOptions.filter((option) => ['timeGridDay', 'listWeek'].includes(option.value))
  }, [mdUp])

  return (
    <Stack
      alignItems='center'
      flexWrap='wrap'
      justifyContent='space-between'
      flexDirection={{
        xs: 'column',
        md: 'row',
      }}
      spacing={2}
      sx={{ px: 3 }}
      {...other}
    >
      <Stack alignItems='center' direction='row' spacing={1}>
        <Typography variant='h4'>ゴミの日管理</Typography>
      </Stack>
      <Stack alignItems='center' direction='row' spacing={1}>
        <IconButton onClick={onDatePrev}></IconButton>
        <IconButton onClick={onDateNext}></IconButton>
        <Button
          onClick={onAddClickTrashCategory}
          sx={{
            width: {
              xs: '100%',
              md: 'auto',
            },
          }}
          variant='contained'
        >
          ゴミの種類を登録する
        </Button>
        {/*<Button*/}
        {/*  onClick={onAddClick}*/}
        {/*  sx={{*/}
        {/*    width: {*/}
        {/*      xs: '100%',*/}
        {/*      md: 'auto',*/}
        {/*    },*/}
        {/*  }}*/}
        {/*  variant='contained'*/}
        {/*>*/}
        {/*  追加する*/}
        {/*</Button>*/}
      </Stack>
    </Stack>
  )
}

CalendarToolbar.propTypes = {
  children: PropTypes.node,
  date: PropTypes.instanceOf(Date).isRequired,
  onAddClick: PropTypes.func,
  onAddClickTrashCategory: PropTypes.func,
  onDateNext: PropTypes.func,
  onDatePrev: PropTypes.func,
  onDateToday: PropTypes.func,
  onViewChange: PropTypes.func,
  view: PropTypes.oneOf<CalendarView>(['dayGridMonth', 'timeGridWeek', 'timeGridDay', 'listWeek'])
    .isRequired,
}
