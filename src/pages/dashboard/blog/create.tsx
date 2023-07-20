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
  FormControlLabel,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Switch,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { BreadcrumbsSeparator } from '../../../components/breadcrumbs-separator'
import type { File } from '../../../components/file-dropzone'
import { FileDropzone } from '../../../components/file-dropzone'
import { QuillEditor } from '../../../components/quill-editor'
import { usePageView } from '../../../hooks/use-page-view'
import { Layout as DashboardLayout } from '../../../layouts/dashboard'
import { paths } from '../../../paths'
import { fileToBase64 } from '../../../utils/file-to-base64'

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
        <title>Blog: Post Create | シチゴウキッチン | 運営画面デモ</title>
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
            <Typography variant='h4'>お知らせ登録</Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <Link
                color='text.primary'
                component={NextLink}
                href={paths.dashboard.blog.index}
                variant='subtitle2'
              >
                お知らせ一覧
              </Link>
            </Breadcrumbs>
          </Stack>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid xs={12} md={4}>
                    <Typography variant='h6'>基本情報</Typography>
                  </Grid>
                  <Grid xs={12} md={8}>
                    <Stack spacing={3}>
                      <TextField fullWidth label='タイトル' name='title' />
                      <TextField fullWidth label='配信日' />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid xs={12} md={4}>
                    <Typography variant='h6'>サムネイル</Typography>
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
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid xs={12} md={4}>
                    <Typography variant='h6'>内容</Typography>
                  </Grid>
                  <Grid xs={12} md={8}>
                    <QuillEditor placeholder='Write something' sx={{ height: 330 }} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid xs={12} md={4}>
                    <Typography variant='h6'>その他の配信先</Typography>
                  </Grid>
                  <Box>
                    <FormControlLabel
                      control={<Switch name='allDay' />}
                      label='パークホームズ柏たなか'
                    />
                    <FormControlLabel control={<Switch name='allDay' />} label='幕張ベイパーク' />
                    <FormControlLabel
                      control={<Switch name='allDay' />}
                      label='パークホームズ昭島中神'
                    />
                    <FormControlLabel
                      control={<Switch name='allDay' />}
                      label='ガーデンズ稲毛海岸'
                    />
                    <FormControlLabel
                      control={<Switch name='allDay' />}
                      label='パークタワー西新宿'
                    />
                    <FormControlLabel
                      control={<Switch name='allDay' />}
                      label='パークシティ高田馬場'
                    />
                  </Box>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
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
              justifyContent: 'space-between',
              mb: 8,
              mt: 6,
              px: 3,
              py: 2,
            }}
          >
            <Typography variant='subtitle1'></Typography>
            <Stack alignItems='center' direction='row' spacing={2}>
              <Button
                component={NextLink}
                href={paths.dashboard.blog.postDetails}
                variant='contained'
              >
                登録する
              </Button>
            </Stack>
          </Card>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
