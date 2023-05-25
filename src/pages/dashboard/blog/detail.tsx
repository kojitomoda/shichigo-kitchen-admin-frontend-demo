import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/list/main.css'
import '@fullcalendar/timeline/main.css'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Calendar from '@fullcalendar/react'
import {
  Box,
  Breadcrumbs,
  Card,
  Container,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { usePageView } from '../../../hooks/use-page-view'
import { Layout as DashboardLayout } from '../../../layouts/dashboard'
import { CalendarContainer } from '../../../sections/dashboard/calendar/calendar-container'
import { useDispatch, useSelector } from '../../../store'
import { thunks } from '../../../thunks/calendar'
import type { CalendarEvent, CalendarView } from '../../../types/calendar'
import { CalenderListTable } from '@/sections/dashboard/calendar/calender-list-table'
import { BlogDetailListTable } from '@/sections/dashboard/blog/post-detail-list-table'
import { BreadcrumbsSeparator } from '@/components/breadcrumbs-separator'
import NextLink from 'next/link'
import { paths } from '@/paths'

interface DialogState {
  isOpen: boolean
  data?: {
    eventId?: string
    range?: {
      start: number
      end: number
    }
  }
}

const useEvents = (): CalendarEvent[] => {
  const dispatch = useDispatch()
  const events = useSelector((state) => state.calendar.events)

  const getEvents = useCallback((): void => {
    dispatch(thunks.getEvents())
  }, [dispatch])

  useEffect(
    () => {
      getEvents()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return events
}

const useCurrentEvent = (
  dialog: DialogState,
  events: CalendarEvent[],
): CalendarEvent | undefined => {
  return useMemo((): CalendarEvent | undefined => {
    if (!dialog.data) {
      return undefined
    }

    return events.find((event) => event.id === dialog.data!.eventId)
  }, [dialog, events])
}

const Page: NextPage = () => {
  const dispatch = useDispatch()
  const calendarRef = useRef<Calendar | null>(null)
  const events = useEvents()
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<CalendarView>('timeGridDay')
  const [dialog, setDialog] = useState<DialogState>({
    isOpen: false,
    data: undefined,
  })
  const [dialogTrash, setDialogTrash] = useState<DialogState>({
    isOpen: false,
    data: undefined,
  })
  const currentEvent = useCurrentEvent(dialog, events)

  usePageView()

  const handleScreenResize = useCallback((): void => {
    const calendarEl = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()
      const newView = 'dayGridMonth'

      calendarApi.changeView(newView)
      setView(newView)
    }
  }, [calendarRef])

  useEffect(
    () => {
      handleScreenResize()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const handleViewChange = useCallback((view: CalendarView): void => {
    const calendarEl = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.changeView(view)
      setView(view)
    }
  }, [])

  const handleDateToday = useCallback((): void => {
    const calendarEl = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.today()
      setDate(calendarApi.getDate())
    }
  }, [])

  const handleDatePrev = useCallback((): void => {
    const calendarEl = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.prev()
      setDate(calendarApi.getDate())
    }
  }, [])

  const handleDateNext = useCallback((): void => {
    const calendarEl = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.next()
      setDate(calendarApi.getDate())
    }
  }, [])

  const handleAddClick = useCallback((): void => {
    setDialog({
      isOpen: true,
    })
  }, [])
  const onAddClickTrashCategory = useCallback((): void => {
    setDialogTrash({
      isOpen: true,
    })
  }, [])

  const handleCloseDialog = useCallback((): void => {
    setDialog({
      isOpen: false,
    })
  }, [])

  const handleCloseDialogTrash = useCallback((): void => {
    setDialogTrash({
      isOpen: false,
    })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: Calendar | Devias Kit PRO</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={1} style={{ marginBottom: '30px' }}>
            <Typography variant='h3'>【自治会】プロカメラマン撮影会　ボランティア募集</Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <Link
                color='text.primary'
                component={NextLink}
                href={paths.dashboard.index}
                variant='subtitle2'
              >
                お知らせ
              </Link>
            </Breadcrumbs>
          </Stack>
          <Stack spacing={3}>
            <Card>
              <CalendarContainer>
                <BlogDetailListTable />
              </CalendarContainer>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
