import type { FC } from 'react'
import { Box, Button, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material'
import { PropertyList } from '@/components/property-list'
import { PropertyListItem } from '@/components/property-list-item'

export const CustomerDataManagement: FC = (props) => (
  <>
    <Card {...props} sx={{ mb: 3 }}>
      <CardHeader title='退去手続き' />
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ mb: 3 }}>
          <TextField fullWidth label='退去日' name='name' required value={''} />
        </Box>
        <Button color='error' variant='outlined'>
          退去登録する
        </Button>
        <Box sx={{ mt: 1 }}>
          <Typography color='text.secondary' variant='body2'>
            退去日以降、ログインできません
          </Typography>
        </Box>
      </CardContent>
    </Card>
    {/*<Card {...props}>*/}
    {/*  ↓退去日が登録されている場合*/}
    {/*  <CardHeader title='退去日変更' />*/}
    {/*  <CardContent sx={{ pt: 0 }}>*/}
    {/*    <Box sx={{ mb: 3 }}>*/}
    {/*      <TextField fullWidth label='退去日' name='name' required value={''} />*/}
    {/*    </Box>*/}
    {/*    <Button color='success' variant='outlined' style={{ marginRight: '30px' }}>*/}
    {/*      退去日を変更する*/}
    {/*    </Button>*/}
    {/*    <Button color='error' variant='outlined'>*/}
    {/*      退去予定をキャンセルする*/}
    {/*    </Button>*/}
    {/*    <Box sx={{ mt: 1 }}>*/}
    {/*      <Typography color='text.secondary' variant='body2'>*/}
    {/*        退去日以降、ログインできません*/}
    {/*      </Typography>*/}
    {/*    </Box>*/}
    {/*  </CardContent>*/}
    {/*</Card>*/}
  </>
)
