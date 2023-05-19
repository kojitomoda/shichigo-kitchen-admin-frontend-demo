import type { FC } from 'react'
import NextLink from 'next/link'
import EyeIcon from '@untitled-ui/icons-react/build/esm/Eye'
import LayoutBottomIcon from '@untitled-ui/icons-react/build/esm/LayoutBottom'
import { Box, Button, Container, Rating, Stack, SvgIcon, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { paths } from '../../paths'
import { HomeCodeSamples } from './home-code-samples'

export const HomeHero: FC = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundImage: 'url("/assets/gradient-bg.svg")',
        pt: '120px',
      }}
    >
      <Container maxWidth='lg'>
        <Box maxWidth='sm'>
          <Stack
            alignItems='center'
            direction='row'
            flexWrap='wrap'
            spacing={1}
            sx={{ my: 3 }}
          ></Stack>
          <Stack alignItems='center' direction='row' spacing={2}>
            <Button
              component={NextLink}
              href={paths.dashboard.index}
              startIcon={
                <SvgIcon fontSize='small'>
                  <EyeIcon />
                </SvgIcon>
              }
              sx={(theme) =>
                theme.palette.mode === 'dark'
                  ? {
                      backgroundColor: 'neutral.50',
                      color: 'neutral.900',
                      '&:hover': {
                        backgroundColor: 'neutral.200',
                      },
                    }
                  : {
                      backgroundColor: 'neutral.900',
                      color: 'neutral.50',
                      '&:hover': {
                        backgroundColor: 'neutral.700',
                      },
                    }
              }
              variant='contained'
            >
              Live Demo
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            pt: '120px',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              overflow: 'hidden',
              width: '90%',
              fontSize: 0,
              mt: -2, // hack to cut the bottom box shadow
              mx: -2,
              pt: 2,
              px: 2,
              '& img': {
                borderTopLeftRadius: (theme) => theme.shape.borderRadius * 2.5,
                borderTopRightRadius: (theme) => theme.shape.borderRadius * 2.5,
                boxShadow: 16,
                width: '100%',
              },
            }}
          ></Box>
          <Box
            sx={{
              maxHeight: '100%',
              maxWidth: '100%',
              overflow: 'hidden',
              position: 'absolute',
              right: 0,
              top: 40,
              '& > div': {
                height: 460,
                width: 560,
              },
            }}
          ></Box>
        </Box>
      </Container>
    </Box>
  )
}
