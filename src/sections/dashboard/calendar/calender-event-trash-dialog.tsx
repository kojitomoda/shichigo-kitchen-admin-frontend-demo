import type { FC } from 'react'
import { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import { addMinutes } from 'date-fns'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02'
import {
  Box,
  Button,
  Dialog,
  Divider,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Stack,
  SvgIcon,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { useDispatch } from '../../../store'
import { thunks } from '../../../thunks/calendar'
import type { CalendarEvent } from '../../../types/calendar'

interface Values {
  allDay: boolean
  color: string
  description: string
  end: Date
  start: Date
  title: string
  submit: string | null
}

const useInitialValues = (
  event?: CalendarEvent,
  range?: { start: number; end: number },
): Values => {
  return useMemo((): Values => {
    if (event) {
      return {
        allDay: event.allDay || false,
        color: event.color || '',
        description: event.description || '',
        end: event.end ? new Date(event.end) : addMinutes(new Date(), 30),
        start: event.start ? new Date(event.start) : new Date(),
        title: event.title || '',
        submit: null,
      }
    }

    if (range) {
      return {
        allDay: false,
        color: '',
        description: '',
        end: new Date(range.end),
        start: new Date(range.start),
        title: '',
        submit: null,
      }
    }

    return {
      allDay: false,
      color: '',
      description: '',
      end: addMinutes(new Date(), 30),
      start: new Date(),
      title: '',
      submit: null,
    }
  }, [event, range])
}

const validationSchema = Yup.object({
  allDay: Yup.bool(),
  description: Yup.string().max(5000),
  end: Yup.date(),
  start: Yup.date(),
  title: Yup.string().max(255).required('Title is required'),
})

interface CalendarEventDialogProps {
  event?: CalendarEvent
  onAddComplete?: () => void
  onClose?: () => void
  onDeleteComplete?: () => void
  onEditComplete?: () => void
  open?: boolean
  range?: { start: number; end: number }
}

export const CalenderEventTrashDialog: FC<CalendarEventDialogProps> = (props) => {
  const {
    event,
    onAddComplete,
    onClose,
    onDeleteComplete,
    onEditComplete,
    open = false,
    range,
  } = props
  const dispatch = useDispatch()
  const initialValues = useInitialValues(event, range)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const data = {
          allDay: values.allDay,
          description: values.description,
          end: values.end.getTime(),
          start: values.start.getTime(),
          title: values.title,
        }

        if (event) {
          await dispatch(
            thunks.updateEvent({
              eventId: event.id!,
              update: data,
            }),
          )
          toast.success('Event updated')
        } else {
          await dispatch(thunks.createEvent(data))
          toast.success('Event added')
        }

        if (!event) {
          onAddComplete?.()
        } else {
          onEditComplete?.()
        }
      } catch (err) {
        console.error(err)
        toast.error('Something went wrong!')
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err.message })
        helpers.setSubmitting(false)
      }
    },
  })

  const handleStartDateChange = useCallback(
    (date: Date | null): void => {
      formik.setFieldValue('start', date)

      // Prevent end date to be before start date
      if (formik.values.end && date && date > formik.values.end) {
        formik.setFieldValue('end', date)
      }
    },
    [formik],
  )

  const handleEndDateChange = useCallback(
    (date: Date | null): void => {
      formik.setFieldValue('end', date)

      // Prevent start date to be after end date
      if (formik.values.start && date && date < formik.values.start) {
        formik.setFieldValue('start', date)
      }
    },
    [formik],
  )

  const handleDelete = useCallback(async (): Promise<void> => {
    if (!event) {
      return
    }

    try {
      await dispatch(
        thunks.deleteEvent({
          eventId: event.id!,
        }),
      )
      onDeleteComplete?.()
    } catch (err) {
      console.error(err)
    }
  }, [dispatch, event, onDeleteComplete])

  return (
    <Dialog fullWidth maxWidth='sm' onClose={onClose} open={open}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ p: 3 }}>
          <Typography align='center' gutterBottom variant='h5'>
            {event ? 'Edit Event' : 'ゴミの種類を登録する'}
          </Typography>
        </Box>
        <Stack spacing={2} sx={{ p: 3 }}>
          <TextField
            fullWidth
            label='名称を入力ください'
            name='title'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <TextField
            fullWidth
            label='名称を入力ください'
            name='title'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <TextField
            fullWidth
            label='名称を入力ください'
            name='title'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <TextField
            fullWidth
            label='名称を入力ください'
            name='title'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <TextField
            fullWidth
            label='名称を入力ください'
            name='title'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </Stack>
        <Divider />
        <Stack alignItems='center' direction='row' spacing={1} sx={{ p: 2 }}>
          {event && (
            <IconButton onClick={(): Promise<void> => handleDelete()}>
              <SvgIcon>
                <Trash02Icon />
              </SvgIcon>
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button color='inherit' onClick={onClose}>
            キャンセル
          </Button>
          <Button disabled={formik.isSubmitting} type='submit' variant='contained'>
            登録する
          </Button>
        </Stack>
      </form>
    </Dialog>
  )
}

CalenderEventTrashDialog.propTypes = {
  // @ts-ignore
  event: PropTypes.object,
  onAddComplete: PropTypes.func,
  onClose: PropTypes.func,
  onDeleteComplete: PropTypes.func,
  onEditComplete: PropTypes.func,
  open: PropTypes.bool,
  // @ts-ignore
  range: PropTypes.object,
}
