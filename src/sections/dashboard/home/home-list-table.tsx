import type { ChangeEvent, FC, MouseEvent } from 'react'
import NextLink from 'next/link'
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { paths } from '../../../paths'
import { useRouter } from 'next/navigation'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'

export const HomeListTable: FC = () => {
  const router = useRouter()

  const trashs = [
    {
      id: 1,
      name: 'パークホームズ柏たなか',
      week: '月、木',
    },
    {
      id: 2,
      name: '幕張ベイパーク',
      week: '火、金',
    },
    {
      id: 3,
      name: 'パークホームズ昭島中神',
      week: '土',
    },
    {
      id: 4,
      name: 'ザ・ガーデンズ稲毛海岸',
      week: '日',
    },
    {
      id: 4,
      name: 'パークタワー西新宿',
      week: '日',
    },
    {
      id: 4,
      name: '三田ガーデンヒルズ',
      week: '日',
    },
    {
      id: 4,
      name: 'パークシティ高田馬場',
      week: '日',
    },
  ]

  return (
    <Box sx={{ position: 'relative' }}>
      <Stack alignItems='center' direction='row' flexWrap='wrap' spacing={3} sx={{ p: 3 }}>
        <Box component='form' sx={{ flexGrow: 1 }}>
          <OutlinedInput
            defaultValue=''
            fullWidth
            placeholder='建物名を入力ください'
            startAdornment={<InputAdornment position='start'></InputAdornment>}
          />
        </Box>
        <Button
          startIcon={
            <SvgIcon>
              <SearchMdIcon />
            </SvgIcon>
          }
          variant='contained'
        >
          検索
        </Button>
      </Stack>
      <Table sx={{ minWidth: 500 }}>
        <TableHead>
          <TableRow>
            <TableCell>名前</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trashs.map((trash) => {
            return (
              <TableRow hover key={trash.id} onClick={() => router.push('dashboard/customers')}>
                <TableCell>{trash.name}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Box>
  )
}
