import type { ChangeEvent, FC, MouseEvent } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import NextLink from 'next/link'
import numeral from 'numeral'
import PropTypes from 'prop-types'
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'
import DownloadIcon from '@mui/icons-material/Download'
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

export const CustomerDetailList: FC = () => {
  const rooms = [
    {
      id: 1,
      in: '2017/12/31',
      out: '',
    },
    {
      id: 2,
      in: '2011/12/31',
      out: '2015/01/01',
    },
    {
      id: 3,
      in: '2005/12/31',
      out: '2010/01/01',
    },
    {
      id: 4,
      in: '2000/12/31',
      out: '2001/01/01',
    },
    {
      id: 5,
      in: '1995/12/31',
      out: '1999/01/01',
    },
    {
      id: 6,
      in: '1991/12/31',
      out: '1992/01/01',
    },
    {
      id: 7,
      in: '1990/12/31',
      out: '1991/01/01',
    },
  ]
  return (
    <Box sx={{ position: 'relative' }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell>入居日</TableCell>
            <TableCell>退去日</TableCell>
            <TableCell>QRコードダウンロード</TableCell>
            <TableCell>個別チャット</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => {
            return (
              <TableRow hover key={room.id} onClick={() => console.log('')}>
                <TableCell>{room.in}</TableCell>
                <TableCell>{room.out}</TableCell>
                <TableCell align='left'>
                  <DownloadIcon />
                </TableCell>
                <TableCell>
                  <IconButton
                    component={NextLink}
                    href={'/dashboard/chat?threadKey=5e867fa7082c3c5921403a26'}
                  >
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
