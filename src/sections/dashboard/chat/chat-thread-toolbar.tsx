import type { FC } from 'react'
import { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNowStrict } from 'date-fns'
import ArchiveIcon from '@untitled-ui/icons-react/build/esm/Archive'
import Bell01Icon from '@untitled-ui/icons-react/build/esm/Bell01'
import Camera01Icon from '@untitled-ui/icons-react/build/esm/Camera01'
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal'
import PhoneIcon from '@untitled-ui/icons-react/build/esm/Phone'
import SlashCircle01Icon from '@untitled-ui/icons-react/build/esm/SlashCircle01'
import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02'
import {
  Avatar,
  AvatarGroup,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material'
import { useMockedUser } from '../../../hooks/use-mocked-user'
import type { Participant } from '../../../types/chat'

const getRecipients = (participants: Participant[], userId: string): Participant[] => {
  return participants.filter((participant) => participant.id !== userId)
}

const getDisplayName = (recipients: Participant[]): string => {
  return recipients.map((participant) => participant.name).join(', ')
}

const getLastActive = (recipients: Participant[]): string | null => {
  const hasLastActive = recipients.length === 1 && recipients[0].lastActivity

  if (hasLastActive) {
    return formatDistanceToNowStrict(recipients[0].lastActivity!, { addSuffix: true })
  }

  return null
}

interface ChatThreadToolbarProps {
  participants?: Participant[]
}

export const ChatThreadToolbar: FC<ChatThreadToolbarProps> = (props) => {
  const { participants = [], ...other } = props
  const user = useMockedUser()
  const moreRef = useRef<HTMLButtonElement | null>(null)
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const handleMenuOpen = useCallback((): void => {
    setOpenMenu(true)
  }, [])

  const handleMenuClose = useCallback((): void => {
    setOpenMenu(false)
  }, [])

  // Maybe use memo for these values

  const recipients = getRecipients(participants, user.id)
  const displayName = getDisplayName(recipients)
  const lastActive = getLastActive(recipients)

  return (
    <>
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='space-between'
        spacing={2}
        sx={{
          flexShrink: 0,
          minHeight: 64,
          px: 2,
          py: 1,
        }}
        {...other}
      >
        <Stack alignItems='center' direction='row' spacing={2}>
          {/*<AvatarGroup*/}
          {/*  max={2}*/}
          {/*  sx={{*/}
          {/*    ...(recipients.length > 1 && {*/}
          {/*      '& .MuiAvatar-root': {*/}
          {/*        height: 30,*/}
          {/*        width: 30,*/}
          {/*        '&:nth-of-type(2)': {*/}
          {/*          mt: '10px',*/}
          {/*        },*/}
          {/*      },*/}
          {/*    }),*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {recipients.map((recipient) => (*/}
          {/*    <Avatar key={recipient.id} src={undefined} />*/}
          {/*  ))}*/}
          {/*</AvatarGroup>*/}
          <div>
            <Typography variant='subtitle1'>{displayName}</Typography>
            {/*{lastActive && (*/}
            {/*  <Typography color='text.secondary' variant='caption'>*/}
            {/*    Last active {lastActive}*/}
            {/*  </Typography>*/}
            {/*)}*/}
          </div>
        </Stack>
        <Stack alignItems='center' direction='row' spacing={1}>
          {/*<IconButton>*/}
          {/*  <SvgIcon>*/}
          {/*    <PhoneIcon />*/}
          {/*  </SvgIcon>*/}
          {/*</IconButton>*/}
          {/*<IconButton>*/}
          {/*  <SvgIcon>*/}
          {/*    <Camera01Icon />*/}
          {/*  </SvgIcon>*/}
          {/*</IconButton>*/}
          {/*<Tooltip title='More options'>*/}
          {/*  <IconButton onClick={handleMenuOpen} ref={moreRef}>*/}
          {/*    <SvgIcon>*/}
          {/*      <DotsHorizontalIcon />*/}
          {/*    </SvgIcon>*/}
          {/*  </IconButton>*/}
          {/*</Tooltip>*/}
        </Stack>
      </Stack>
      {/*<Menu anchorEl={moreRef.current} keepMounted onClose={handleMenuClose} open={openMenu}>*/}
      {/*  <MenuItem>*/}
      {/*    <ListItemIcon>*/}
      {/*      <SvgIcon>*/}
      {/*        <SlashCircle01Icon />*/}
      {/*      </SvgIcon>*/}
      {/*    </ListItemIcon>*/}
      {/*    <ListItemText primary='Block' />*/}
      {/*  </MenuItem>*/}
      {/*  <MenuItem>*/}
      {/*    <ListItemIcon>*/}
      {/*      <SvgIcon>*/}
      {/*        <Trash02Icon />*/}
      {/*      </SvgIcon>*/}
      {/*    </ListItemIcon>*/}
      {/*    <ListItemText primary='Delete' />*/}
      {/*  </MenuItem>*/}
      {/*  <MenuItem>*/}
      {/*    <ListItemIcon>*/}
      {/*      <SvgIcon>*/}
      {/*        <ArchiveIcon />*/}
      {/*      </SvgIcon>*/}
      {/*    </ListItemIcon>*/}
      {/*    <ListItemText primary='Archive' />*/}
      {/*  </MenuItem>*/}
      {/*  <MenuItem>*/}
      {/*    <ListItemIcon>*/}
      {/*      <SvgIcon>*/}
      {/*        <Bell01Icon />*/}
      {/*      </SvgIcon>*/}
      {/*    </ListItemIcon>*/}
      {/*    <ListItemText primary='Mute' />*/}
      {/*  </MenuItem>*/}
      {/*</Menu>*/}
    </>
  )
}

ChatThreadToolbar.propTypes = {
  // @ts-ignore
  participants: PropTypes.array,
}
