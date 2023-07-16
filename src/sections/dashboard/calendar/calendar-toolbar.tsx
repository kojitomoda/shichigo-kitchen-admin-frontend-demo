import type { ChangeEvent, FC, ReactNode } from 'react'
import { useCallback } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import ChevronLeftIcon from '@untitled-ui/icons-react/build/esm/ChevronLeft'
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight'
import { IconButton, Stack, SvgIcon, Typography } from '@mui/material'
import type { CalendarView } from '../../../types/calendar'

interface CalendarToolbarProps {
  children?: ReactNode
  date: Date
  onAddClick?: () => void
  onDateNext?: () => void
  onDatePrev?: () => void
  onDateToday?: () => void
  onViewChange?: (view: CalendarView) => void
  view: CalendarView
}

export const CalendarToolbar: FC<CalendarToolbarProps> = (props) => {
  const { date, onAddClick, onDateNext, onDatePrev, onDateToday, onViewChange, view, ...other } =
    props

  const handleViewChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      onViewChange?.(event.target.value as CalendarView)
    },
    [onViewChange],
  )

  const dateMonth = format(date, 'MM')
  const dateDay = format(date, 'y')

  return (
    <Stack
      alignItems='center'
      flexWrap='wrap'
      justifyContent='space-between'
      flexDirection={{
        xs: 'column',
        md: 'row',
      }}
      spacing={3}
      sx={{ px: 3 }}
      {...other}
    >
      <Stack alignItems='center' direction='row' spacing={1}>
        <Typography variant='h4'>注文締切時間設定</Typography>
        <Typography sx={{ fontWeight: 400 }} variant='h6'>
          {dateDay}
        </Typography>
        <Typography variant='h6'>{dateMonth}月</Typography>
      </Stack>
      <Stack alignItems='center' direction='row' spacing={1}>
        <IconButton onClick={onDatePrev}>
          <SvgIcon>
            <ChevronLeftIcon />
          </SvgIcon>
        </IconButton>
        <IconButton onClick={onDateNext}>
          <SvgIcon>
            <ChevronRightIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
    </Stack>
  )
}

CalendarToolbar.propTypes = {
  children: PropTypes.node,
  date: PropTypes.instanceOf(Date).isRequired,
  onAddClick: PropTypes.func,
  onDateNext: PropTypes.func,
  onDatePrev: PropTypes.func,
  onDateToday: PropTypes.func,
  onViewChange: PropTypes.func,
  view: PropTypes.oneOf<CalendarView>(['dayGridMonth', 'timeGridWeek', 'timeGridDay', 'listWeek'])
    .isRequired,
}
