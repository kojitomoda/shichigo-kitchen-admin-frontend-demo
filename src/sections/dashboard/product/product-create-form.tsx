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
  newPrice: 0,
  oldPrice: 0,
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
                <Typography variant='h6'>基本情報</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    label=''
                    name='name'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <TextField
                    fullWidth
                    label='金額'
                    name='pirce'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <TextField
                    fullWidth
                    label='商品説明'
                    name='description'
                    multiline // 複数行入力を有効にする
                    rows={4}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <TextField
                    fullWidth
                    label='標準在庫数'
                    name='stock'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  {menuCategory && (
                    <TextField
                      onChange={formik.handleChange}
                      label='メニューカテゴリー'
                      name='prefectureId'
                      select
                      fullWidth
                      value={formik.values.categoryId}
                    >
                      {menuCategory.map((menu) => (
                        <MenuItem key={menu.id} value={menu.id}>
                          {menu.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
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
                <Typography variant='h6'>商品画像</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  {cover ? (
                    <Box
                      sx={{
                        backgroundImage: `url(${cover})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        borderRadius: 1,
                        height: 230,
                        mt: 3,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        border: 1,
                        borderRadius: 1,
                        borderStyle: 'dashed',
                        borderColor: 'divider',
                        height: 230,
                        mt: 3,
                        p: 3,
                      }}
                    >
                      <Typography align='center' color='text.secondary' variant='h6'>
                        Select a cover image
                      </Typography>
                      <Typography
                        align='center'
                        color='text.secondary'
                        sx={{ mt: 1 }}
                        variant='subtitle1'
                      >
                        Image used for the blog post cover and also for Open Graph meta
                      </Typography>
                    </Box>
                  )}
                  <div>
                    <Button color='inherit' disabled={!cover} onClick={handleCoverRemove}>
                      削除する
                    </Button>
                  </div>
                  <FileDropzone
                    accept={{ 'image/*': [] }}
                    maxFiles={1}
                    onDrop={handleCoverDrop}
                    caption='(JPG, PNG maximum 900x400)'
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Stack alignItems='center' direction='row' justifyContent='flex-end' spacing={1}>
          <Button type='submit' variant='contained'>
            登録する
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}
