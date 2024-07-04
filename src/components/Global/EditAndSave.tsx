import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { t } from 'i18next';

function EditAndSave({
  edit,
  setEdit,
  onSave = () => {},
  onUpdate = () => {},
  onCancel = () => {},
  showConfirm = true,
  isManagerOrAdmin,
}: any) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        ml: 'auto',
        flexWrap: 'wrap',

        ...(edit && {
          width: '100%',
          justifyContent: 'flex-end',
        }),
      }}
    >
      {showConfirm && edit ? (
        <>
          <CancelRoundedIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setEdit(false);
              onCancel();
            }}
            style={{ width: '40px', height: '40px' }}
            color='error'
          />
          <CheckCircleRoundedIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              onUpdate();
            }}
            style={{ width: '40px', height: '40px' }}
            color='success'
          />
        </>
      ) : (
        <Button
          sx={{
            padding: 0,
            textTransform: 'capitalize',
            background: 'transparent',
          }}
          onClick={() => {
            setEdit(true);
            onSave();
          }}
        >
          <Typography
            sx={{
              fontWeight: '500',
            }}
          >
            {t('Edit')}
          </Typography>
        </Button>
      )}
    </Box>
  );
}

// <PenIcon
//   sx={{ cursor: 'pointer', display: isManagerOrAdmin }}
//   onClick={() => {
//     setEdit(true);
//     onSave();
//   }}
// />
export default EditAndSave;
