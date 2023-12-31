import type { ChangeEvent, FC } from 'react'
import { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown'
import { Button, Checkbox, FormControlLabel, Menu, MenuItem, SvgIcon } from '@mui/material'

interface MultiSelectProps {
  label: string
  // Same as type as the value received above
  onChange?: (value: any[]) => void
  options: { label: string; value: unknown }[]
  // This should accept string[], number[] or boolean[]
  value: any[]
}

export const MultiSelect: FC<MultiSelectProps> = (props) => {
  const { label, onChange, options, value = [], ...other } = props
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const handleMenuOpen = useCallback((): void => {
    setOpenMenu(true)
  }, [])

  const handleMenuClose = useCallback((): void => {
    setOpenMenu(false)
  }, [])

  const handleValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      let newValue = [...value]

      if (event.target.checked) {
        newValue.push(event.target.value)
      } else {
        newValue = newValue.filter((item) => item !== event.target.value)
      }

      onChange?.(newValue)
    },
    [onChange, value],
  )

  return (
    <>
      <Button
        color='inherit'
        endIcon={
          <SvgIcon>
            <ChevronDownIcon />
          </SvgIcon>
        }
        onClick={handleMenuOpen}
        ref={anchorRef}
        {...other}
      >
        {label}
      </Button>
      <Menu
        anchorEl={anchorRef.current}
        onClose={handleMenuClose}
        open={openMenu}
        PaperProps={{ style: { width: 250 } }}
      >
        {options.map((option) => (
          <MenuItem key={option.label}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={value.includes(option.value)}
                  onChange={handleValueChange}
                  value={option.value}
                />
              }
              label={option.label}
              sx={{
                flexGrow: 1,
                mr: 0,
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

MultiSelect.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
}
