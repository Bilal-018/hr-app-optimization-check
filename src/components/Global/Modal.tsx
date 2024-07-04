import { Box, Button, Modal, Typography, alpha } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

const style = {
  modalWrapper: (theme: any) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '20px',
    backgroundColor: 'white',
    padding: '20px',
    maxWidth: '620px',
    width: '100%',
    // maxHeight: '92vh',
    // overflowY: 'auto',
  }),
  cancelBtn: (theme: any) => ({
    fontWeight: 500,
    fontSize: '14px',
    padding: '15px 40px',
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    borderRadius: '10px',
    boxShadow: 'none',
    width: 'fit-content',
    m: 0,

    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
    },
  }),
  saveBtn: (theme: any) => ({
    fontWeight: 500,
    fontSize: '14px',
    padding: '15px 40px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '10px',
    boxShadow: 'none',
    width: 'fit-content',
    m: 0,

    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.8),
    },
  }),
};

function BaseModal({
  open,
  handleClose,
  children,
  onSave,
  title = 'New Leave Request',
  yesOrNo = false,
  showSaveButton = true,
  sx = {},
  isCloseIcon = true,
  hideTitle = false,
}: any) {
  const { t } = useTranslation();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={(theme) => ({
          ...style.modalWrapper(theme),
          ...sx,
          background: theme.palette.mode === 'light' ? 'white' : '#2b2d3e',
          outline: 'none'
        })}
      >
        <Box className='f-b-c'>
          {!hideTitle && <Typography variant='h5'>{t(title)}</Typography>}
          {isCloseIcon && (
            <Box
              className='action-icon-rounded'
              sx={{
                svg: {
                  fill: (theme) => theme.palette.info.main,
                },

              }}
            >
              <Button onClick={handleClose} sx={{
                background: (theme) => theme.palette.grey[200]
              }}>
                <CloseIcon />
              </Button>
            </Box>
          )}
        </Box>
        <Box sx={{ overflowY: 'auto', maxHeight:'90vh' }}>
          <Box
            sx={{
              // mt: "30px",
              // mb: "20px",
              // overflowY: 'auto',
            }}
          >
            {children}
          </Box>
          <Box
            className='f-e-c'
            sx={{
              gap: '20px',
              mt: '5px'
            }}
          >
            {showSaveButton && (
              <>
                <Button
                  variant='contained'
                  sx={(theme) => ({ ...style.cancelBtn(theme) })}
                  onClick={handleClose}
                >
                  {yesOrNo ? t('No') : t('Cancel')}
                </Button>
                <Button
                  variant='contained'
                  sx={(theme) => ({ ...style.saveBtn(theme) })}
                  onClick={onSave}
                >
                  {yesOrNo ? t('Yes') : t('Save')}
                </Button>{' '}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default BaseModal;
