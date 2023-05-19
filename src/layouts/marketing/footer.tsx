import type { FC } from 'react'
import {
  Box,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { Logo } from '../../components/logo'
import { paths } from '../../paths'
import NextLink from 'next/link'

interface Section {
  title: string
  items: {
    title: string
    path: string
  }[]
}

const sections: Section[] = [
  {
    title: 'Menu',
    items: [
      {
        title: 'Browse Components',
        path: paths.components.index,
      },
      {
        title: 'Documentation',
        path: paths.docs.welcome,
      },
    ],
  },
  {
    title: 'Legal',
    items: [
      {
        title: 'Terms & Conditions',
        path: '#',
      },
      {
        title: 'License',
        path: '#',
      },
      {
        title: 'Contact',
        path: '#',
      },
    ],
  },
  {
    title: 'Social',
    items: [
      {
        title: 'Instagram',
        path: '#',
      },
      {
        title: 'LinkedIn',
        path: '#',
      },
    ],
  },
]

export const Footer: FC = (props) => (
  <Box>
    <Container maxWidth='lg'></Container>
  </Box>
)
