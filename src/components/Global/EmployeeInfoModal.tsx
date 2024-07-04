import React from "react";
import { Modal, Box, Button } from "@mui/material";
import HRIndex from "../Profile/MyProfile/ProfileOptions/HRIndex";
import HRProfileInfo from "../Profile/MyProfile/HRProfileInfo";
import { alpha } from "@mui/material/styles"; // Ensure to import alpha
import CloseIcon from '@mui/icons-material/Close';

interface EmployeeInfoModalProps {
  open: boolean;
  onClose: () => void;
  employeeData: any;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  px: 2,
  borderRadius: '20px'
  // overflowY: "auto",
  // height: "85vh",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "20px",
};

const cancelBtnStyle = (theme: any) => ({
  fontWeight: 500,
  fontSize: "14px",
  padding: "15px 40px",
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  borderRadius: "10px",
  boxShadow: "none",
  width: "fit-content",
  m: 0,

  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
  },
});

const saveBtnStyle = (theme: any) => ({
  fontWeight: 500,
  fontSize: "14px",
  padding: "15px 40px",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "10px",
  boxShadow: "none",
  width: "fit-content",
  m: 0,

  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.8),
  },
});

const EmployeeInfoModal: React.FC<EmployeeInfoModalProps> = ({ open, onClose, employeeData }) => {
  if (!employeeData) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Box sx={{ overflowY: "auto", height: "85vh", py:4, px:2 }}>
          <Box
            className='action-icon-rounded'
            sx={{
              svg: {
                fill: (theme) => theme.palette.info.main,
              },
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button onClick={onClose} sx={{
              background: (theme) => theme.palette.grey[200]
            }}>
              <CloseIcon />
            </Button>
          </Box>
          <HRProfileInfo />
          <HRIndex />
          <Box sx={buttonContainerStyle}>
            <Button
              variant="contained"
              sx={cancelBtnStyle}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={saveBtnStyle}
              onClick={onClose}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EmployeeInfoModal;
