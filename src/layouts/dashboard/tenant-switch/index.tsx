import type { FC } from 'react'
import { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown'
import { Box, IconButton, Stack, SvgIcon, Typography } from '@mui/material'
import { TenantPopover } from './tenant-popover'

const tenants: string[] = ['シチゴウキッチン 仙台店', 'ジーバーFOOD  仙台本店']

export const TenantSwitch: FC = (props) => {
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const [openPopover, setOpenPopover] = useState<boolean>(false)

  const handlePopoverOpen = useCallback(() => {
    setOpenPopover(true)
  }, [])

  const handlePopoverClose = useCallback(() => {
    setOpenPopover(false)
  }, [])

  const handleTenantChange = useCallback((tenant: string) => {
    setOpenPopover(false)
  }, [])

  return (
    <>
      <Stack alignItems='center' direction='row' spacing={2} {...props}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography color='inherit'>シチゴウキッチン</Typography>
          <Typography color='neutral.400' variant='body2'>
            本店
          </Typography>
        </Box>
        <IconButton onClick={handlePopoverOpen} ref={anchorRef}>
          <SvgIcon sx={{ fontSize: 16 }}>
            <ChevronDownIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <TenantPopover
        anchorEl={anchorRef.current}
        onChange={handleTenantChange}
        onClose={handlePopoverClose}
        open={openPopover}
        tenants={tenants}
      />
    </>
  )
}

TenantSwitch.propTypes = {
  // @ts-ignore
  sx: PropTypes.object,
}
