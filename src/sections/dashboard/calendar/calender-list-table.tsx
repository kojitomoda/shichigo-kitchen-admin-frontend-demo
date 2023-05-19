import type { ChangeEvent, FC, MouseEvent } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { paths } from '../../../paths'
import { useRouter } from 'next/navigation'

export const CalenderListTable: FC = () => {
  const router = useRouter()

  const trashs = [
    {
      id: 1,
      name: '燃えるゴミ',
      week: '月、木',
    },
    {
      id: 2,
      name: '燃えないゴミ',
      week: '火、金',
    },
    {
      id: 3,
      name: 'ペットボトル',
      week: '土',
    },
    {
      id: 4,
      name: '缶',
      week: '日',
    },
  ]

  return (
    <Box sx={{ position: 'relative' }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell>名前</TableCell>
            <TableCell>曜日</TableCell>
            <TableCell align='right'>詳細</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trashs.map((trash) => {
            return (
              <TableRow hover key={trash.id} onClick={() => router.push('calender-detail')}>
                <TableCell>{trash.name}</TableCell>
                <TableCell>{trash.week}</TableCell>
                <TableCell align='right'>
                  <IconButton component={NextLink} href={paths.dashboard.customers.details}>
                    <SvgIcon>
                      <ArrowRightIcon />
                    </SvgIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Box>
  )
}
