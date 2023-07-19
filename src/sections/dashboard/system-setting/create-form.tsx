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
import { usePageView } from '@/hooks/use-page-view'
import { fileToBase64 } from '@/utils/file-to-base64'
import { prefectures } from '@/utils/constants'

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
  categoryId: number
}

const initialValues: Values = {
  barcode: '925487986526',
  category: '',
  description: '',
  images: [],
  name: '',
  newPrice: 8,
  oldPrice: 8,
  sku: 'IYV-8745',
  submit: null,
  categoryId: 1,
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

const menuCategory = [
  {
    id: 1,
    name: '定番メニュー',
  },
  {
    id: 2,
    name: '日替わりメニュー',
  },
]

const initialCover = '/assets/covers/abstract-1-4x3-large.png'
export const CreateForm: FC = (props) => {
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

  const [cover, setCover] = useState<string | null>(initialCover)

  usePageView()

  const handleCoverDrop = useCallback(async ([file]: File[]) => {
    const data = (await fileToBase64(file)) as string
    setCover(data)
  }, [])

  const handleCoverRemove = useCallback((): void => {
    setCover(null)
  }, [])

  return (
    <form onSubmit={formik.handleSubmit} {...props}>
      <Stack spacing={4}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <Typography variant='h5' sx={{ pb: 1 }}>
                  在庫アラート設定
                </Typography>
                <Typography variant='body2'>
                  注文数が設定した割合に達した場合、登録したメールアドレスに、商品名と日付を通知します
                </Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label='割合'
                    name='oldPrice'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type='number'
                    value={formik.values.oldPrice}
                  />
                  <TextField
                    fullWidth
                    label='通知先メールアドレス１'
                    name='pirce'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <TextField
                    fullWidth
                    label='通知先メールアドレス２'
                    name='pirce'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <TextField
                    fullWidth
                    label='通知先メールアドレス３'
                    name='pirce'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <Typography variant='h5'>定休日</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <div>
                    <FormControlLabel control={<Switch />} label='月' />
                    <FormControlLabel control={<Switch />} label='火' />
                    <FormControlLabel control={<Switch />} label='水' />
                    <FormControlLabel control={<Switch />} label='木' />
                    <FormControlLabel control={<Switch />} label='金' />
                    <FormControlLabel control={<Switch defaultChecked />} label='土' />
                    <FormControlLabel control={<Switch defaultChecked />} label='日' />
                    <FormControlLabel control={<Switch defaultChecked />} label='祝日' />
                  </div>
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
