import type { FC } from 'react';
import { useCallback, useState } from 'react';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import { IconButton, SvgIcon, Tooltip } from '@mui/material';
import { SearchDialog } from './search-dialog';

export const SearchButton: FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpen = useCallback(
    (): void => {
      setOpenDialog(true);
    },
    []
  );

  const handleClose = useCallback(
    (): void => {
      setOpenDialog(false);
    },
    []
  );

  return (
    <>
      <Tooltip title="Search">
        <IconButton onClick={handleOpen}>
          <SvgIcon>
            <SearchMdIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <SearchDialog
        onClose={handleClose}
        open={openDialog}
      />
    </>
  );
};
