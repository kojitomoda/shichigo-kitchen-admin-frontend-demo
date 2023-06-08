import type { FC } from 'react'
import {
  Box,
  Button,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { paths } from '@/paths'
import { useRouter } from 'next/navigation'

export const TagListTable: FC = () => {
  const router = useRouter()

  const trashs = [
    {
      id: 1,
      name: '自治会',
      week: '月、木',
    },
    {
      id: 2,
      name: '重要',
      week: '火、金',
    },
    {
      id: 3,
      name: '夏祭り',
      week: '土',
    },
  ]

  return (
    <Box sx={{ position: 'relative' }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell>タグ名</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trashs.map((trash) => {
            return (
              <TableRow hover key={trash.id}>
                <TableCell>{trash.name}</TableCell>
                <TableCell>
                  <Button variant='contained' color={'error'}>
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Box>
  )
}
