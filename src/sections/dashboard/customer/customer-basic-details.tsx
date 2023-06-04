import type { FC } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardActions, CardHeader, TableCell } from '@mui/material'
import { PropertyList } from '../../../components/property-list'
import { PropertyListItem } from '../../../components/property-list-item'

interface CustomerBasicDetailsProps {
  address1?: string
  address2?: string
  country?: string
  email: string
  isVerified: boolean
  phone?: string
  state?: string
}

export const CustomerBasicDetails: FC<CustomerBasicDetailsProps> = (props) => {
  const { address1, address2, country, email, isVerified, phone, state, ...other } = props

  return (
    <Card {...other}>
      <CardHeader title='現在' />
      <PropertyList>
        <PropertyListItem divider label='入居日' value={'2017/12/31'} />
        {/*<PropertyListItem divider label='退去予定日' value={'　'} />*/}
        <PropertyListItem divider label='退去日' value={'　'} />
        <PropertyListItem divider label='最終ログイン日' value={'2023/05/12 12:33:40'} />
      </PropertyList>
    </Card>
  )
}

CustomerBasicDetails.propTypes = {
  address1: PropTypes.string,
  address2: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  phone: PropTypes.string,
  state: PropTypes.string,
}
