import type { FC } from 'react'
import { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import Star01Icon from '@untitled-ui/icons-react/build/esm/Star01'
import DotsVerticalIcon from '@untitled-ui/icons-react/build/esm/DotsVertical'
import Globe01Icon from '@untitled-ui/icons-react/build/esm/Globe03'
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  Divider,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material'
import type { Item } from '../../../types/file-manager'
import { bytesToSize } from '../../../utils/bytes-to-size'
import { ItemIcon } from './item-icon'
import { ItemMenu } from './item-menu'

interface ItemListCardProps {
  item: Item
  onDelete?: (itemId: string) => void
  onFavorite?: (itemId: string, value: boolean) => void
  onOpen?: (itemId: string) => void
}

export const ItemListCard: FC<ItemListCardProps> = (props) => {
  const { item, onDelete, onFavorite, onOpen } = props
  const menuRef = useRef<HTMLButtonElement | null>(null)
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const handleMenuOpen = useCallback((): void => {
    setOpenMenu(true)
  }, [])

  const handleMenuClose = useCallback((): void => {
    setOpenMenu(false)
  }, [])

  const handleDelete = useCallback((): void => {
    setOpenMenu(false)
    onDelete?.(item.id)
  }, [item, onDelete])

  let size = bytesToSize(item.size)

  if (item.type === 'folder') {
    size += `• ${item.itemsCount} items`
  }

  const createdAt = item.createdAt && format(item.createdAt, 'MMM dd, yyyy')
  const showShared = !item.isPublic && (item.shared || []).length > 0

  return (
    <>
      <Card
        key={item.id}
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 0,
          transition: (theme) =>
            theme.transitions.create(['background-color, box-shadow'], {
              easing: theme.transitions.easing.easeInOut,
              duration: 200,
            }),
          '&:hover': {
            backgroundColor: 'background.paper',
            boxShadow: 16,
          },
        }}
        variant='outlined'
      >
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='space-between'
          spacing={3}
          sx={{
            pt: 2,
            px: 2,
          }}
        >
          <IconButton onClick={() => onFavorite?.(item.id, !item.isFavorite)}>
            <SvgIcon
              fontSize='small'
              sx={{ color: item.isFavorite ? 'warning.main' : 'action.active' }}
            >
              <Star01Icon />
            </SvgIcon>
          </IconButton>
          <IconButton onClick={handleMenuOpen}
ref={menuRef}>
            <SvgIcon fontSize='small'>
              <DotsVerticalIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              mb: 1,
            }}
          >
            <Box
              onClick={() => onOpen?.(item.id)}
              sx={{
                display: 'inline-flex',
                cursor: 'pointer',
              }}
            >
              <ItemIcon type={item.type}
extension={item.extension} />
            </Box>
          </Box>
          <Typography
            onClick={() => onOpen?.(item.id)}
            sx={{ cursor: 'pointer' }}
            variant='subtitle2'
          >
            {item.name}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Stack alignItems='center'
direction='row'
justifyContent='space-between'
spacing={1}>
            <div>
              <Typography color='text.secondary'
variant='body2'>
                {size}
              </Typography>
            </div>
            <div>
              {item.isPublic && (
                <Tooltip title='Public'>
                  <Avatar
                    sx={{
                      height: 32,
                      width: 32,
                    }}
                  >
                    <SvgIcon fontSize='small'>
                      <Globe01Icon />
                    </SvgIcon>
                  </Avatar>
                </Tooltip>
              )}
              {showShared && (
                <AvatarGroup max={3}>
                  {item.shared?.map((person) => (
                    <Avatar
                      key={person.name}
                      src={person.avatar}
                      sx={{
                        height: 32,
                        width: 32,
                      }}
                    />
                  ))}
                </AvatarGroup>
              )}
            </div>
          </Stack>
          <Typography color='text.secondary'
variant='caption'>
            Created at {createdAt}
          </Typography>
        </Box>
      </Card>
      <ItemMenu
        anchorEl={menuRef.current}
        onClose={handleMenuClose}
        onDelete={handleDelete}
        open={openMenu}
      />
    </>
  )
}

ItemListCard.propTypes = {
  // @ts-ignore
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onFavorite: PropTypes.func,
  onOpen: PropTypes.func,
}
