import type { FC } from 'react'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
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
import { bottom } from '@popperjs/core'

interface CustomerEditFormProps {
  customer: Customer
}

export const OrderEditForm: FC<CustomerEditFormProps> = (props) => {
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

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title='アカウント登録' />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label='名前'
                name='name'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value=''
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label='メールアドレス'
                name='email'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value=''
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.country && formik.errors.country)}
                fullWidth
                helperText={formik.touched.country && formik.errors.country}
                label='電話番号'
                name='country'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value=''
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.state && formik.errors.state)}
                fullWidth
                helperText={formik.touched.state && formik.errors.state}
                label='メモ'
                name='state'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value=''
              />
            </Grid>
            {/*<Grid xs={12} md={6}>*/}
            {/*  <TextField*/}
            {/*    error={!!(formik.touched.address1 && formik.errors.address1)}*/}
            {/*    fullWidth*/}
            {/*    helperText={formik.touched.address1 && formik.errors.address1}*/}
            {/*    label='Address 1'*/}
            {/*    name='address1'*/}
            {/*    onBlur={formik.handleBlur}*/}
            {/*    onChange={formik.handleChange}*/}
            {/*    value={formik.values.address1}*/}
            {/*  />*/}
            {/*</Grid>*/}
            {/*<Grid xs={12} md={6}>*/}
            {/*  <TextField*/}
            {/*    error={!!(formik.touched.address2 && formik.errors.address2)}*/}
            {/*    fullWidth*/}
            {/*    helperText={formik.touched.address2 && formik.errors.address2}*/}
            {/*    label='Address 2'*/}
            {/*    name='address2'*/}
            {/*    onBlur={formik.handleBlur}*/}
            {/*    onChange={formik.handleChange}*/}
            {/*    value={formik.values.address2}*/}
            {/*  />*/}
            {/*</Grid>*/}
            {/*<Grid xs={12} md={6}>*/}
            {/*  <TextField*/}
            {/*    error={!!(formik.touched.phone && formik.errors.phone)}*/}
            {/*    fullWidth*/}
            {/*    helperText={formik.touched.phone && formik.errors.phone}*/}
            {/*    label='Phone number'*/}
            {/*    name='phone'*/}
            {/*    onBlur={formik.handleBlur}*/}
            {/*    onChange={formik.handleChange}*/}
            {/*    value={formik.values.phone}*/}
            {/*  />*/}
            {/*</Grid>*/}
          </Grid>
          <Stack divider={<Divider />} spacing={3} sx={{ mt: 3 }}></Stack>
        </CardContent>
      </Card>
    </form>
  )
}

OrderEditForm.propTypes = {
  // @ts-ignore
  customer: PropTypes.object.isRequired,
}
