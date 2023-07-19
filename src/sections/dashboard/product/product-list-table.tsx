import type { ChangeEvent, FC, MouseEvent } from 'react'
import { Fragment, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-hot-toast'
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01'
import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Stack,
  SvgIcon,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { Scrollbar } from '../../../components/scrollbar'
import type { Product } from '../../../types/product'
import NextLink from 'next/link'
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'

interface CategoryOption {
  label: string
  value: string
}

const categoryOptions: CategoryOption[] = [
  {
    label: 'Healthcare',
    value: 'healthcare',
  },
  {
    label: 'Makeup',
    value: 'makeup',
  },
  {
    label: 'Dress',
    value: 'dress',
  },
  {
    label: 'Skincare',
    value: 'skincare',
  },
  {
    label: 'Jewelry',
    value: 'jewelry',
  },
  {
    label: 'Blouse',
    value: 'blouse',
  },
]

interface ProductListTableProps {
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void
  page: number
  products: Product[]
  productsCount: number
  rowsPerPage: number
}

export const ProductListTable: FC<ProductListTableProps> = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    products,
    productsCount,
    rowsPerPage,
    ...other
  } = props
  const [currentProduct, setCurrentProduct] = useState<string | null>(null)

  const handleProductToggle = useCallback((productId: string): void => {
    setCurrentProduct((prevProductId) => {
      if (prevProductId === productId) {
        return null
      }

      return productId
    })
  }, [])

  const handleProductClose = useCallback((): void => {
    setCurrentProduct(null)
  }, [])

  const handleProductUpdate = useCallback((): void => {
    setCurrentProduct(null)
    toast.success('Product updated')
  }, [])

  const handleProductDelete = useCallback((): void => {
    toast.error('Product cannot be deleted')
  }, [])

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell>商品名</TableCell>
              <TableCell>商品画像</TableCell>
              <TableCell>金額</TableCell>
              <TableCell>標準在庫数</TableCell>
              <TableCell>編集</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              const isCurrent = product.id === currentProduct

              return (
                <Fragment key={product.id}>
                  <TableRow hover key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell width='25%'>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        {product.image ? (
                          <Box
                            sx={{
                              alignItems: 'center',
                              backgroundColor: 'neutral.50',
                              backgroundImage: `url(${product.image})`,
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              borderRadius: 1,
                              display: 'flex',
                              height: 80,
                              justifyContent: 'center',
                              overflow: 'hidden',
                              width: 80,
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              alignItems: 'center',
                              backgroundColor: 'neutral.50',
                              borderRadius: 1,
                              display: 'flex',
                              height: 80,
                              justifyContent: 'center',
                              width: 80,
                            }}
                          >
                            <SvgIcon>
                              <Image01Icon />
                            </SvgIcon>
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>{product.price}円</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    {/*<TableCell>*/}
                    {/*  <SeverityPill color={statusColor}>{product.status}</SeverityPill>*/}
                    {/*</TableCell>*/}
                    <TableCell>
                      <IconButton>
                        <SvgIcon>
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {isCurrent && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        sx={{
                          p: 0,
                          position: 'relative',
                          '&:after': {
                            position: 'absolute',
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: 'primary.main',
                            width: 3,
                            height: 'calc(100% + 1px)',
                          },
                        }}
                      >
                        <CardContent>
                          <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                              <Typography variant='h6'>Basic details</Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    defaultValue={product.name}
                                    fullWidth
                                    label='Product name'
                                    name='name'
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    defaultValue={product.sku}
                                    disabled
                                    fullWidth
                                    label='SKU'
                                    name='sku'
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    defaultValue={product.category}
                                    fullWidth
                                    label='Category'
                                    select
                                  >
                                    {categoryOptions.map((option) => (
                                      <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    defaultValue={product.id}
                                    disabled
                                    fullWidth
                                    label='Barcode'
                                    name='barcode'
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Typography variant='h6'>Pricing and stocks</Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    defaultValue={product.price}
                                    fullWidth
                                    label='Old price'
                                    name='old-price'
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position='start'>
                                          {product.currency}
                                        </InputAdornment>
                                      ),
                                    }}
                                    type='number'
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    defaultValue={product.price}
                                    fullWidth
                                    label='New price'
                                    name='new-price'
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position='start'>$</InputAdornment>
                                      ),
                                    }}
                                    type='number'
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                  sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                  }}
                                >
                                  <Switch />
                                  <Typography variant='subtitle2'>
                                    Keep selling when stock is empty
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <Divider />
                        <Stack
                          alignItems='center'
                          direction='row'
                          justifyContent='space-between'
                          sx={{ p: 2 }}
                        >
                          <Stack alignItems='center' direction='row' spacing={2}>
                            <Button onClick={handleProductUpdate} type='submit' variant='contained'>
                              Update
                            </Button>
                            <Button color='inherit' onClick={handleProductClose}>
                              Cancel
                            </Button>
                          </Stack>
                          <div>
                            <Button onClick={handleProductDelete} color='error'>
                              Delete product
                            </Button>
                          </div>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component='div'
        count={productsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  )
}

ProductListTable.propTypes = {
  products: PropTypes.array.isRequired,
  productsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}
