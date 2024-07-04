/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import BaseModal from '../../components/Global/Modal';
import {
  Box,
  CircularProgress,
  Typography,
  Stack,
  FormControlLabel,
  Checkbox,
  Grid,
  TextField,
} from '@mui/material';
import employee from '../../assets/images/employee.svg';
import { t } from 'i18next';
import { jwtLeave } from '../../services/interceptors';

import { UserImage } from '../../components/Navigation/Topbar/UserInfo/UserInfo';
import { useSnackbar } from '../../components/Global/WithSnackbar';
import BasicTabs from '../../components/Global/BasicTabs';
import EnhancedTable from '../../components/Global/Table';

interface Props {
  isVisible: boolean;
  handleClose: () => void;
  leaveDetails: any;
  isLoading: boolean;
  onSave: any;
}
const ManagerLeaveApprovalModal: FC<Props> = ({
  isVisible,
  handleClose,
  isLoading,
  leaveDetails,
  onSave,
}) => {
  const [managerComment, setManagerComment] = useState('');
  const [scheduleData, setScheduleData] = useState<any>([]);
  const [schedulerLoading, setSchedulerLoading] = useState<boolean>(true);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const [errors, setErrors] = useState({
    leaveStatus: false,
  });
  const { showMessage }: any = useSnackbar();

  const empId = sessionStorage.getItem('empId_key');
  const email = sessionStorage.getItem('email_key');

  const handleStatusChange = (status: any) => {
    setSelectedStatus(status);
    setErrors((prevErrors) => ({
      ...prevErrors,
      leaveStatus: false,
    }));
  };

  const handleCommentsChange = (event: any) => {
    setManagerComment(event.target.value);
  };

  const getConflictData = async () => {
    try {
      if (!schedulerLoading) {
        setSchedulerLoading(true);
      }
      const response = await jwtLeave.get(
        `api/LeaveManager/GetScheduleConflict?LeaveDetailId=${leaveDetails.leaveDetailId}&LineManagerId=${empId}`
      );
      setScheduleData(response.data);
    } catch (error) {
      console.error('Error fetching schedule data:', error);
    }
    setSchedulerLoading(false);
  };

  function createData(
    user: any,
    startDate: any,
    endDate: any,
    totalDays: any,
    name: any,
    employeeDetailId: any
  ) {
    return {
      user: (
        <Stack direction='row' gap={2} alignItems='center'>
          <UserImage
            userPicture={
              'https://hrmsapicoreappservice.azurewebsites.net/api/Employee/GetProfilePictureFileStream?EmployeeDetailId=' +
              employeeDetailId +
              '&email=' +
              email
            }
          />
          <Typography className='smallBody'>{name}</Typography>
        </Stack>
      ),

      startDate,
      endDate,
      noOfDays: (
        <Typography color='yellow' fontSize={18}>
          {totalDays}
        </Typography>
      ),
    };
  }

  const rows = scheduleData.map((item: any) =>
    createData(
      `${item.firstName} ${item.lastName}`,
      new Date(item.startDate).toLocaleDateString('en-GB'),
      new Date(item.endDate).toLocaleDateString('en-GB'),
      item.totalDays,
      `${item.firstName} ${item.lastName}`,
      item.employeeDetailId
    )
  );

  const handleSave = () => {
    if (selectedStatus === null || selectedStatus === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        leaveStatus: true,
      }));
      return;
    }

    if (selectedStatus === 'Approved') {
      onSave('Approved', leaveDetails.leaveDetailId, managerComment);
      showMessage('Leave is Approved successfully.', 'success');
    } else if (selectedStatus === 'Rejected') {
      onSave('Rejected', leaveDetails.leaveDetailId, managerComment);
      showMessage('Leave is Rejected Successfully.', 'success');
    }

    handleClose();
    // getLeaveDetail();
  };

  const headCells = [
    {
      id: 'firstName lastName',
      label: 'User',
    },
    {
      id: 'startDate',
      label: 'Starting Date',
    },
    {
      id: 'endDate',
      label: 'End date',
    },
    {
      id: 'totalDays',
      label: 'No. of days',
    },
  ];

  useEffect(() => {
    if (leaveDetails) {
      getConflictData();
    }
  }, [leaveDetails, empId]);

  return (
    <BaseModal
      open={isVisible}
      handleClose={handleClose}
      title={'Leave Management - My approval'}
      onSave={handleSave}
    >
      {isLoading || schedulerLoading ? (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
        // height='100vh'
        >
          <CircularProgress />
        </Box>
      ) : (
        <BasicTabs
          tabs={['Summary', 'Schedule']}
          tabPanels={[
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '092C4C',
                }}
              >
                Employee
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  my: '6px'
                }}
              >
                <img src={employee} alt='employee' />{' '}
                <Typography>
                  {leaveDetails?.firstName} {leaveDetails?.lastName}
                </Typography>
              </Box>

              <Box my='6px'>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '092C4C',
                    marginBottom: '10px',
                  }}
                >
                  {t('Leaves')}
                </Typography>

                <input
                  style={{
                    width: '100%',
                    background: 'white',
                    border: '1px solid #E0E0E0',
                    borderRadius: '10px',
                    padding: '10px',
                  }}
                  type='text'
                  value={leaveDetails?.leaveType}
                  disabled
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: '100px',
                  my: '4px'
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '092C4C',
                      marginBottom: '24px'
                    }}
                  >
                    Starting Date
                  </Typography>

                  <Typography>
                    {new Date(leaveDetails?.startDate).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '092C4C',
                      marginBottom: '24px'
                    }}
                  >
                    End Date
                  </Typography>

                  <Typography>
                    {new Date(leaveDetails?.endDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>

              <Box mt='18px'>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '092C4C',
                    marginBottom: '10px',
                  }}
                >
                  Employee Comments
                </Typography>

                <input
                  style={{
                    width: '100%',
                    background: 'white',
                    border: '1px solid #E0E0E0',
                    borderRadius: '10px',
                    padding: '10px',
                  }}
                  type='text'
                  value={leaveDetails?.employeeComments}
                  disabled
                />
              </Box>

              <Box mt='14px'>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    gap: '10px',
                  }}
                >
                  <Grid item xs={12} md={6}>
                    <Typography className='SmallBody'>
                      {t('Leave Status')}
                    </Typography>
                    <Stack direction='row' gap='5px' alignItems='center'>
                      <FormControlLabel
                        label={t('Reject')}
                        control={
                          <Checkbox
                            color='error'
                            checked={selectedStatus === 'Rejected'}
                            onChange={() => handleStatusChange('Rejected')}
                          />
                        }
                      />

                      <FormControlLabel
                        label={t('Approve')}
                        control={
                          <Checkbox
                            color='success'
                            checked={selectedStatus === 'Approved'}
                            onChange={() => handleStatusChange('Approved')}
                          />
                        }
                      />
                    </Stack>
                    {errors.leaveStatus && (
                      <Typography variant='caption' color='error'>
                        Leave Status is required
                      </Typography>
                    )}
                  </Grid>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <span>Potential schedule conflict</span>

                    {scheduleData?.length && <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        style={{
                          height: '50px',
                          width: '50px',
                          borderRadius: '100%',
                          objectFit: 'cover',
                        }}
                        src={employee}
                        alt='employee'
                      />

                      <img
                        style={{
                          height: '50px',
                          width: '50px',
                          borderRadius: '100%',
                          objectFit: 'cover',
                        }}
                        src={employee}
                        alt='employee'
                      />

                      <img
                        style={{
                          height: '50px',
                          width: '50px',
                          borderRadius: '100%',
                          objectFit: 'cover',
                        }}
                        src={employee}
                        alt='employee'
                      />

                      <Box
                        sx={{
                          background: '#18A0FB',
                          height: '24px',
                          width: '40px',
                          borderRadius: '30px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: 'white',
                        }}
                      >
                        2+
                      </Box>
                    </Box>}

                    <span
                      style={{
                        color: '#18A0FB',
                        fontSize: '14px',
                      }}
                    >
                      {scheduleData?.length} employees
                    </span>
                  </Box>
                </Box>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '092C4C',
                    marginBottom: '2px',
                  }}
                >
                  Comments
                </Typography>

                {/* <textarea
        style={{
          width: '100%',
          background: 'transparent',
          border: '1px solid #E0E0E0',
          borderRadius: '10px',
          padding: '10px',
          resize: 'none',
          backgroundColor: '#F7F8FB',
        }}
        placeholder={'Insert notes here'}
        
       //  disabled
      /> */}

                <TextField
                  size="small"
                  variant='outlined'
                  value={managerComment}
                  fullWidth
                  multiline
                  rows={3}
                  onChange={handleCommentsChange}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid #E0E0E0',
                    borderRadius: '10px',
                    resize: 'none',
                    backgroundColor: '#F7F8FB',
                  }}
                  sx={{
                    '& .MuiInputBase-root':{
                      py: '3px'
                    }
                  }}
                />
              </Box>
            </Box>,
            <EnhancedTable head={headCells} rows={rows} />,
          ]}
        />
      )}
    </BaseModal>
  );
};

export default ManagerLeaveApprovalModal;
