import type { ReactNode } from 'react'
import type { TFunction } from 'react-i18next'
import { SvgIcon } from '@mui/material'
import Building04Icon from '../../icons/untitled-ui/duocolor/building-04'
import CalendarIcon from '../../icons/untitled-ui/duocolor/calendar'
import LayoutAlt02Icon from '../../icons/untitled-ui/duocolor/layout-alt-02'
import Mail04Icon from '../../icons/untitled-ui/duocolor/mail-04'
import MessageChatSquareIcon from '../../icons/untitled-ui/duocolor/message-chat-square'
import ReceiptCheckIcon from '../../icons/untitled-ui/duocolor/receipt-check'
import Users03Icon from '../../icons/untitled-ui/duocolor/users-03'
import { tokens } from '../../locales/tokens'
import { paths } from '../../paths'

interface Item {
  disabled?: boolean
  icon?: ReactNode
  items?: Item[]
  label?: ReactNode
  path?: string
  title: string
}

export interface Section {
  items: Item[]
  subheader?: string
}

export const getSections = (t: TFunction): Section[] => [
  {
    items: [
      {
        title: t(tokens.nav.customers),
        path: paths.dashboard.customers.index,
        icon: (
          <SvgIcon fontSize='small'>
            <ReceiptCheckIcon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.list),
            path: paths.dashboard.customers.index,
          },
        ],
      },
      {
        title: t(tokens.nav.blog),
        path: paths.dashboard.blog.index,
        icon: (
          <SvgIcon fontSize='small'>
            <Mail04Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: '一覧',
            path: paths.dashboard.blog.index,
          },
          {
            title: '登録',
            path: paths.dashboard.blog.postCreate,
          },
        ],
      },
      {
        title: t(tokens.nav.minutes),
        path: paths.dashboard.minutes.index,
        icon: (
          <SvgIcon fontSize='small'>
            <LayoutAlt02Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: '一覧',
            path: paths.dashboard.minutes.index,
          },
          {
            title: '登録',
            path: paths.dashboard.minutes.postCreate,
          },
        ],
      },
      {
        title: t(tokens.nav.chat),
        path: paths.dashboard.chat,
        icon: (
          <SvgIcon fontSize='small'>
            <MessageChatSquareIcon />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.calendar),
        path: paths.dashboard.calendar,
        icon: (
          <SvgIcon fontSize='small'>
            <CalendarIcon />
          </SvgIcon>
        ),
      },
      {
        title: '建物管理',
        path: paths.dashboard.products.index,
        icon: (
          <SvgIcon fontSize='small'>
            <Building04Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: '詳細',
            path: paths.dashboard.products.create,
          },
        ],
      },
    ],
  },
  {
    subheader: '管理者設定',
    items: [
      {
        title: t(tokens.nav.orderList),
        icon: (
          <SvgIcon fontSize='small'>
            <Users03Icon />
          </SvgIcon>
        ),
        path: paths.dashboard.orders.index,
        items: [
          {
            title: t(tokens.nav.list),
            path: paths.dashboard.orders.index,
          },
          {
            title: t(tokens.nav.details),
            path: paths.dashboard.orders.details,
          },
        ],
      },
    ],
  },
]
