import type { ReactNode } from 'react'
import type { TFunction } from 'react-i18next'
import { SvgIcon } from '@mui/material'
import CalendarIcon from '../../icons/untitled-ui/duocolor/calendar'
import Users03Icon from '../../icons/untitled-ui/duocolor/users-03'
import ShoppingBag03Icon from '../../icons/untitled-ui/duocolor/shopping-bag-03'
import ShoppingCart01Icon from '../../icons/untitled-ui/duocolor/shopping-cart-01'
import File01Icon from '../../icons/untitled-ui/duocolor/file-01'
import BarChartSquare02Icon from '../../icons/untitled-ui/duocolor/bar-chart-square-02'

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
        title: '取引先管理',
        icon: (
          <SvgIcon fontSize='small'>
            <Users03Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: '一覧',
            path: '/client',
          },
          {
            title: '登録',
            path: '/client/register',
          },
        ],
      },
      {
        title: '商品管理',
        icon: (
          <SvgIcon fontSize='small'>
            <ShoppingBag03Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: '一覧',
            path: '/product',
          },
          {
            title: '登録',
            path: '/product/register',
          },
        ],
      },
      {
        title: '注文管理',
        icon: (
          <SvgIcon fontSize='small'>
            <ShoppingCart01Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: '一覧',
            path: '/order',
          },
          {
            title: '集計',
            path: '/order/summary',
          },
        ],
      },
      {
        title: '在庫管理',
        icon: (
          <SvgIcon fontSize='small'>
            <File01Icon />
          </SvgIcon>
        ),
        path: '/stock',
      },
      {
        title: 'システム設定',
        icon: (
          <SvgIcon fontSize='small'>
            <CalendarIcon />
          </SvgIcon>
        ),
        path: '/system-setting',
      },
      {
        title: '売上分析',
        icon: (
          <SvgIcon fontSize='small'>
            <BarChartSquare02Icon />
          </SvgIcon>
        ),
        path: '/dashboard/ecommerce',
      },
    ],
  },
]
