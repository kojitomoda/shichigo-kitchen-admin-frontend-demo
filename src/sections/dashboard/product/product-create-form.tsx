import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import type { File } from '../../../components/file-dropzone'
import { FileDropzone } from '../../../components/file-dropzone'
import { QuillEditor } from '../../../components/quill-editor'
import { paths } from '../../../paths'

interface CategoryOption {
  label: string
  value: string
}

const categoryOptions: CategoryOption[] = [
  {
    label: 'マンション',
    value: 'healthcare',
  },
  {
    label: 'アパート',
    value: 'makeup',
  },
  {
    label: '団地',
    value: 'dress',
  },
  {
    label: 'ハイツ',
    value: 'skincare',
  },
  {
    label: 'コンドミニアム',
    value: 'jewelry',
  },
]

interface Values {
  barcode: string
  category: string
  description: string
  images: string[]
  name: string
  newPrice: number
  oldPrice: number
  sku: string
  submit: null
}

const initialValues: Values = {
  barcode: '925487986526',
  category: '',
  description: '',
  images: [],
  name: '',
  newPrice: 0,
  oldPrice: 0,
  sku: 'IYV-8745',
  submit: null,
}

const validationSchema = Yup.object({
  barcode: Yup.string().max(255),
  category: Yup.string().max(255),
  description: Yup.string().max(5000),
  images: Yup.array(),
  name: Yup.string().max(255).required(),
  newPrice: Yup.number().min(0).required(),
  oldPrice: Yup.number().min(0),
  sku: Yup.string().max(255),
})

export const ProductCreateForm: FC = (props) => {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        // NOTE: Make API request
        toast.success('Product created')
        router.push(paths.dashboard.products.index)
      } catch (err) {
        console.error(err)
        toast.error('Something went wrong!')
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err.message })
        helpers.setSubmitting(false)
      }
    },
  })

  const handleFilesDrop = useCallback((newFiles: File[]): void => {
    setFiles((prevFiles) => {
      return [...prevFiles, ...newFiles]
    })
  }, [])

  const handleFileRemove = useCallback((file: File): void => {
    setFiles((prevFiles) => {
      return prevFiles.filter((_file) => _file.path !== file.path)
    })
  }, [])

  const handleFilesRemoveAll = useCallback((): void => {
    setFiles([])
  }, [])

  return (
    <form onSubmit={formik.handleSubmit} {...props}>
      <Stack spacing={4}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <Typography variant='h6'>基本情報</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label='名前'
                    name='name'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <TextField
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label='名前(カナ)'
                    name='name'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <TextField
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label='郵便番号'
                    name='name'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <TextField
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label='都道府県'
                    name='name'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <TextField
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label='市町村区'
                    name='name'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <TextField
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label='番地'
                    name='name'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {/*<Card>*/}
        {/*  <CardContent>*/}
        {/*    <Grid container spacing={3}>*/}
        {/*      <Grid xs={12} md={4}>*/}
        {/*        <Stack spacing={1}>*/}
        {/*          <Typography variant='h6'>Images</Typography>*/}
        {/*          <Typography color='text.secondary' variant='body2'>*/}
        {/*            Images will appear in the store front of your website.*/}
        {/*          </Typography>*/}
        {/*        </Stack>*/}
        {/*      </Grid>*/}
        {/*      <Grid xs={12} md={8}>*/}
        {/*        <FileDropzone*/}
        {/*          accept={{ 'image/*': [] }}*/}
        {/*          caption='(JPG, PNG maximum 900x400)'*/}
        {/*          files={files}*/}
        {/*          onDrop={handleFilesDrop}*/}
        {/*          onRemove={handleFileRemove}*/}
        {/*          onRemoveAll={handleFilesRemoveAll}*/}
        {/*        />*/}
        {/*      </Grid>*/}
        {/*    </Grid>*/}
        {/*  </CardContent>*/}
        {/*</Card>*/}
        {/*<Card>*/}
        {/*  <CardContent>*/}
        {/*    <Grid container spacing={3}>*/}
        {/*      <Grid xs={12} md={4}>*/}
        {/*        <Typography variant='h6'>Pricing</Typography>*/}
        {/*      </Grid>*/}
        {/*      <Grid xs={12} md={8}>*/}
        {/*        <Stack spacing={3}>*/}
        {/*          <TextField*/}
        {/*            error={!!(formik.touched.oldPrice && formik.errors.oldPrice)}*/}
        {/*            fullWidth*/}
        {/*            label='Old price'*/}
        {/*            name='oldPrice'*/}
        {/*            onBlur={formik.handleBlur}*/}
        {/*            onChange={formik.handleChange}*/}
        {/*            type='number'*/}
        {/*            value={formik.values.oldPrice}*/}
        {/*          />*/}
        {/*          <TextField*/}
        {/*            error={!!(formik.touched.newPrice && formik.errors.newPrice)}*/}
        {/*            fullWidth*/}
        {/*            label='New Price'*/}
        {/*            name='newPrice'*/}
        {/*            onBlur={formik.handleBlur}*/}
        {/*            onChange={formik.handleChange}*/}
        {/*            type='number'*/}
        {/*            value={formik.values.newPrice}*/}
        {/*          />*/}
        {/*          <div>*/}
        {/*            <FormControlLabel*/}
        {/*              control={<Switch defaultChecked />}*/}
        {/*              label='Keep selling when stock is empty'*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*        </Stack>*/}
        {/*      </Grid>*/}
        {/*    </Grid>*/}
        {/*  </CardContent>*/}
        {/*</Card>*/}
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <Typography variant='h6'>その他</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    label='分類'
                    name='category'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    select
                    value={formik.values.category}
                  >
                    {categoryOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    disabled
                    error={!!(formik.touched.barcode && formik.errors.barcode)}
                    fullWidth
                    label='xxx'
                    name=''
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.barcode}
                  />
                  <TextField
                    disabled
                    error={!!(formik.touched.sku && formik.errors.sku)}
                    fullWidth
                    label='△△△'
                    name=''
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.sku}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Stack alignItems='center' direction='row' justifyContent='flex-end' spacing={1}>
          <Button type='submit' variant='contained'>
            更新する
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}
