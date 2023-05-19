import type { FC } from 'react'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Switch,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { paths } from '../../../paths'
import type { Customer } from '../../../types/customer'
import { wait } from '../../../utils/wait'

interface CustomerEditFormProps {
  customer: Customer
}

export const CustomerEditForm: FC<CustomerEditFormProps> = (props) => {
  const { customer, ...other } = props
  const formik = useFormik({
    initialValues: {
      address1: customer.address1 || '',
      address2: customer.address2 || '',
      country: customer.country || '',
      email: customer.email || '',
      hasDiscount: customer.hasDiscount || false,
      isVerified: customer.isVerified || false,
      name: customer.name || '',
      phone: customer.phone || '',
      state: customer.state || '',
      submit: null,
    },
    validationSchema: Yup.object({
      address1: Yup.string().max(255),
      address2: Yup.string().max(255),
      country: Yup.string().max(255),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      hasDiscount: Yup.bool(),
      isVerified: Yup.bool(),
      name: Yup.string().max(255).required('Name is required'),
      phone: Yup.string().max(15),
      state: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        // NOTE: Make API request
        await wait(500)
        helpers.setStatus({ success: true })
        helpers.setSubmitting(false)
        toast.success('Customer updated')
      } catch (err) {
        console.error(err)
        toast.error('Something went wrong!')
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err.message })
        helpers.setSubmitting(false)
      }
    },
  })

  const rooms = [
    {
      id: 1,
      number: 1001,
    },
    {
      id: 2,
      number: 1002,
    },
    {
      id: 3,
      number: 1003,
    },
    {
      id: 4,
      number: 1004,
    },
    {
      id: 5,
      number: 1005,
    },
    {
      id: 6,
      number: 1006,
    },
    {
      id: 7,
      number: 1007,
    },
    {
      id: 9,
      number: 1008,
    },
    {
      id: 10,
      number: 1009,
    },
    {
      id: 11,
      number: 1011,
    },
    {
      id: 12,
      number: 1012,
    },
    {
      id: 13,
      number: 1013,
    },
  ]

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title='' />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label='入居予定日'
                name='name'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={''}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Box sx={{ flexGrow: 1 }}>
                <TextField
                  defaultValue='web'
                  fullWidth
                  label='部屋番号'
                  name='platform'
                  select
                  SelectProps={{ native: true }}
                >
                  {rooms.map((room) => (
                    <option key={room.id} value={room.number}>
                      {room.number}
                    </option>
                  ))}
                </TextField>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          flexWrap='wrap'
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button disabled={formik.isSubmitting} type='submit' variant='contained'>
            登録する
          </Button>
        </Stack>
      </Card>
    </form>
  )
}

CustomerEditForm.propTypes = {
  // @ts-ignore
  customer: PropTypes.object.isRequired,
}
