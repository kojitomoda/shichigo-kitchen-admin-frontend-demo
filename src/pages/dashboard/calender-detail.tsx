import { useCallback, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal'
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Switch,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { BreadcrumbsSeparator } from '../../components/breadcrumbs-separator'
import type { File } from '../../components/file-dropzone'
import { FileDropzone } from '../../components/file-dropzone'
import { QuillEditor } from '../../components/quill-editor'
import { usePageView } from '../../hooks/use-page-view'
import { Layout as DashboardLayout } from '../../layouts/dashboard'
import { paths } from '../../paths'
import { fileToBase64 } from '../../utils/file-to-base64'
import { DateTimePicker } from '@mui/x-date-pickers'
import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02'

const initialCover = '/assets/covers/abstract-1-4x3-large.png'

const Page: NextPage = () => {
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
    <>
      <Head>
        <title>Blog: Post Create | Devias Kit PRO</title>
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
            <Typography variant='h4'>燃えるゴミ</Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <Link color='text.primary' component={NextLink} href={'calendar'} variant='subtitle2'>
                ゴミの日管理
              </Link>
            </Breadcrumbs>
          </Stack>
          <Stack spacing={3}></Stack>
          <Box
            sx={{
              display: {
                sm: 'none',
              },
              mt: 2,
            }}
          >
            <Button
              component={NextLink}
              href={paths.dashboard.blog.postDetails}
              variant='contained'
            >
              Publish changes
            </Button>
          </Box>
          <Card
            elevation={16}
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              display: 'flex',
              mb: 8,
              mt: 6,
              px: 3,
              py: 2,
            }}
          >
            <Typography variant='subtitle1'></Typography>
            <Stack alignItems='center' direction='row' spacing={2}>
              <Stack spacing={4} sx={{ p: 3 }}>
                <Box>
                  <FormControlLabel control={<Switch name='allDay' />} label='月' checked />
                  <FormControlLabel control={<Switch name='allDay' />} label='火' />
                  <FormControlLabel control={<Switch name='allDay' />} label='水' />
                  <FormControlLabel control={<Switch name='allDay' />} label='水' />
                  <FormControlLabel control={<Switch name='allDay' />} label='木' checked />
                  <FormControlLabel control={<Switch name='allDay' />} label='金' />
                  <FormControlLabel control={<Switch name='allDay' />} label='土' />
                  <FormControlLabel control={<Switch name='allDay' />} label='日' />
                </Box>
                <Stack spacing={2} sx={{ p: 3 }}>
                  <DateTimePicker
                    label='指定日'
                    onChange={() => {}}
                    renderInput={(inputProps) => <TextField fullWidth {...inputProps} />}
                    value={'2022/05/01'}
                    inputFormat='yyyy年MM月dd日'
                    mask='____年__月__日'
                    toolbarFormat='yyyy年MM月dd日'
                  />
                  <DateTimePicker
                    label='指定日'
                    onChange={() => {}}
                    renderInput={(inputProps) => <TextField fullWidth {...inputProps} />}
                    inputFormat='yyyy年MM月dd日'
                    mask='____年__月__日'
                    toolbarFormat='yyyy年MM月dd日'
                    value={'2022/04/20'}
                  />
                  <DateTimePicker
                    label='指定日'
                    onChange={() => {}}
                    renderInput={(inputProps) => <TextField fullWidth {...inputProps} />}
                    inputFormat='yyyy年MM月dd日'
                    mask='____年__月__日'
                    toolbarFormat='yyyy年MM月dd日'
                    value={'2022/04/25'}
                  />
                </Stack>
              </Stack>
              <Divider />
            </Stack>
          </Card>
          <Stack alignItems='center' direction='row' spacing={1} sx={{ p: 2 }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button type='submit' variant='contained'>
              更新する
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
