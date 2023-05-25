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
import { SeverityPill } from '@/components/severity-pill'

export const BlogDetailListTable: FC = () => {
  const router = useRouter()

  const trashs = [
    {
      room_number: 1001,
      read_date: '2023/01/01 12:00:00',
      status: '入居中',
    },
    {
      room_number: 1002,
      read_date: '2023/01/01 12:00:00',
      status: '入居中',
    },
    {
      room_number: 1003,
      read_date: '2023/01/01 12:00:00',
      status: '入居中',
    },
    {
      room_number: 1004,
      read_date: '2023/01/01 12:00:00',
      status: '入居中',
    },
    {
      room_number: 1005,
      read_date: '2023/01/01 12:00:00',
      status: '入居中',
    },
    {
      room_number: 1101,
      read_date: '未読',
      status: '空室',
    },
    {
      room_number: 1102,
      read_date: '未読',
      status: '入居中',
    },
    {
      room_number: 1103,
      read_date: '2023/01/01 12:00:00',
      status: '入居中',
    },
    {
      room_number: 1104,
      read_date: '2023/01/01 12:00:00',
      status: '入居中',
    },
    {
      room_number: 1105,
      read_date: '2023/01/01 12:00:00',
      status: '入居中',
    },
    {
      room_number: 1201,
      read_date: '未読',
      status: '入居中',
    },
    {
      room_number: 1202,
      read_date: '2023/01/01 12:00:00',
      status: '入居中',
    },
  ]

  return (
    <Box sx={{ position: 'relative' }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell>部屋番号</TableCell>
            <TableCell>入居状況</TableCell>
            <TableCell>既読日時</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trashs.map((trash) => {
            const statusColor =
              trash.status === '入居中' ? 'info' : trash.status === '空室' ? 'success' : 'info'
            return (
              <TableRow
                hover
                key={trash.room_number}
                onClick={() => router.push('calender-detail')}
              >
                <TableCell>{trash.room_number}</TableCell>
                <TableCell>
                  <SeverityPill color={statusColor}>{trash.status}</SeverityPill>
                </TableCell>
                <TableCell>{trash.read_date}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Box>
  )
}
