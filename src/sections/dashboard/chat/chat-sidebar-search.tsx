import type { ChangeEvent, FocusEvent } from 'react'
import { forwardRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'
import {
  Avatar,
  Box,
  ClickAwayListener,
  InputAdornment,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  OutlinedInput,
  SvgIcon,
  Typography,
} from '@mui/material'
import { Tip } from '../../../components/tip'
import type { Contact } from '../../../types/chat'

interface ChatSidebarSearchProps {
  isFocused?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onClickAway?: () => void
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  onSelect?: (result: Contact) => void
  query?: string
  results?: Contact[]
}

export const ChatSidebarSearch = forwardRef<HTMLDivElement, ChatSidebarSearchProps>(
  (props, ref) => {
    const {
      isFocused,
      onChange,
      onClickAway = () => {},
      onFocus,
      onSelect,
      query = '',
      results = [],
      ...other
    } = props

    const handleSelect = useCallback(
      (result: Contact): void => {
        onSelect?.(result)
      },
      [onSelect],
    )

    const showTip = isFocused && !query
    const showResults = isFocused && query
    const hasResults = results.length > 0

    return (
      <ClickAwayListener onClickAway={onClickAway}>
        <Box ref={ref} sx={{ p: 2 }} {...other}>
          <OutlinedInput
            fullWidth
            onChange={onChange}
            onFocus={onFocus}
            placeholder='部屋番号を入力ください'
            startAdornment={
              <InputAdornment position='start'>
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
            value={query}
          />
          {showTip && (
            <Box sx={{ py: 2 }}>
              <Tip message='部屋番号を入力ください' />
            </Box>
          )}
          {showResults && (
            <>
              {hasResults ? (
                <Box sx={{ py: 2 }}>
                  <Typography color='text.secondary' variant='subtitle2'>
                    Contacts
                  </Typography>
                  <List>
                    {results.map((contact) => (
                      <ListItemButton key={contact.id} onClick={(): void => handleSelect(contact)}>
                        <ListItemText
                          primary={contact.name}
                          primaryTypographyProps={{
                            noWrap: true,
                            variant: 'subtitle2',
                          }}
                        />
                        {contact.name === '1207' && (
                          <ListItemText
                            style={{ color: 'blue' }}
                            primary={'入居中'}
                            primaryTypographyProps={{
                              noWrap: true,
                              variant: 'subtitle2',
                            }}
                          />
                        )}
                        {contact.name === '1001' && (
                          <ListItemText
                            style={{ color: 'red' }}
                            primary={'退去済'}
                            primaryTypographyProps={{
                              noWrap: true,
                              variant: 'subtitle2',
                            }}
                          />
                        )}
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              ) : (
                <Box sx={{ py: 2 }}>
                  <Typography color='text.secondary' variant='body2'>
                    We couldn&apos;t find any matches for &quot;{query}&quot;. Try checking for
                    typos or using complete words.
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      </ClickAwayListener>
    )
  },
)

ChatSidebarSearch.propTypes = {
  isFocused: PropTypes.bool,
  onChange: PropTypes.func,
  onClickAway: PropTypes.func,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
  query: PropTypes.string,
  results: PropTypes.array,
}
